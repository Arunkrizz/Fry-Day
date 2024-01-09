import { useState } from "react";
import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useUpdateRegisterStatusMutation,useUpdateUnlistStatusMutation } from "../../slices/adminApiSlice";
import { HOTEL_IMAGE_DIR_PATH } from "../../utils/constants";

const UsersDataTable = ({ hotels, setUpdated ,updated }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for the update modal
  const [hotelIdToUpdate, setHotelIdToUpdate] = useState("");
  const [hotelNameToUpdate, setHotelNameToUpdate] = useState("");
  const [hotelEmailToUpdate, setHotelEmailToUpdate] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [mobile, setMobile] = useState("");
  const [dineAndDelivery, setDineAndDelivery] = useState("");
  const [describeOutlet, setDescribeOutlet] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [restaurantImages, setRestaurantImages] = useState([]);
  const [menuImages, setMenuImages] = useState([]);
  const [foodImages, setFoodImages] = useState([]);
  const [approved, setApproved] = useState("");

  const handleOpenUpdateModal = (hotel) => {
    setHotelIdToUpdate(hotel._id)
    setHotelNameToUpdate(hotel.restaurantName);
    setHotelEmailToUpdate(hotel.ownerEmail);
    setRestaurantAddress(hotel.restaurantAddress)
    setOwnerName(hotel.ownerName)
    setLongitude(hotel.longitude)
    setLatitude(hotel.latitude)
    setMobile(hotel.mobile)
    setDineAndDelivery(hotel.dineAndDelivery)
    setDescribeOutlet(hotel.describeOutlet)
    setCuisineType(hotel.cuisineType)
    setRestaurantImages(hotel.restaurantImages)
    setMenuImages(hotel.menuImages)
    setFoodImages(hotel.foodImages)
    setApproved(hotel.approved)

    setShowUpdateModal(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = hotels.filter(
    (hotel) =>
    hotel.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [updateHotelStatusByAdmin, { isLoading: isUpdating }] = useUpdateRegisterStatusMutation();
  const [updateHotelUnlistStatus,{ isLoading: Updating }]=useUpdateUnlistStatusMutation()


  const handleUnlistUpdate = async () => {
    try {
      const responseFromApiCall = await updateHotelUnlistStatus({
       hotelId: hotelIdToUpdate,
      });
      toast.success("Hotel Status Updated Successfully.");
      setHotelIdToUpdate(null); // Clear the user ID to update
      setShowUpdateModal(false); // Close the update modal
      if(updated===true){
        setUpdated(false)
      }else if(updated===false){
        setUpdated(true)
      }
     
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const handleUpdate = async () => {
    try {
      const responseFromApiCall = await updateHotelStatusByAdmin({
       hotelId: hotelIdToUpdate,
      });
      toast.success("Hotel Status Updated Successfully.");
      setHotelIdToUpdate(null); // Clear the user ID to update
      setShowUpdateModal(false); // Close the update modal
      if(updated===true){
        setUpdated(false)
      }else if(updated===false){
        setUpdated(true)
      }
    
      
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>

<BootstrapForm>
        <BootstrapForm.Group className="mt-3" controlId="exampleForm.ControlInput1">
          <BootstrapForm.Label>Search Hotels:</BootstrapForm.Label>
          <BootstrapForm.Control
            style={{ width: "500px" }}
            value={searchQuery}
            type="text"
            placeholder="Enter Name or email........"
            onChange={handleSearch}
          />
        </BootstrapForm.Group>
      </BootstrapForm>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Approval Status</th>
            <th>Update Status</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((hotel, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{hotel.restaurantName}</td>
              <td>{hotel.approved}</td>
              <td>
                <Button
                  type="button"
                  variant="primary"
                  className="mt-3"
                  onClick={() => handleOpenUpdateModal(hotel)}
                >
                  View
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>


      {/* Update User Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Restaurant Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <h3>Restaurant Information</h3>
            <p>Approved: {approved}</p>
            <p>Restaurant name: {hotelNameToUpdate}</p>
            <p>Owner email: {hotelEmailToUpdate}</p>
            <p>Restaurant address: {restaurantAddress}</p>
            <p>Owner name: {ownerName}</p>
            <p>Longitude: {longitude}</p>
            <p>Latitude: {latitude}</p>
            <p>Mobile: {mobile}</p>
            <p>Dine and Delivery: {dineAndDelivery}</p>
            <p>Describe outlet: {describeOutlet}</p>
            <p>Cuisine type: {cuisineType}</p>
           
            <p>Restaurant images:{restaurantImages?.map((image, index) => (  <img
          src={HOTEL_IMAGE_DIR_PATH + image}
          alt={"RES IMG"}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
          }}
        /> 
        ))}</p>
        
            <p>menu images:{menuImages?.map((image, index) => ( <img
          src={HOTEL_IMAGE_DIR_PATH + image}
          alt={"RES IMG"}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
          }}
        />  ))}
        </p>
            <p>food images:{foodImages?.map((image, index) => ( <img
          src={HOTEL_IMAGE_DIR_PATH + image}
          alt={"RES IMG"}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
          }}
        />))} </p>
            

          


            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            close
          </Button>
          {approved==="false"?<Button variant="primary" onClick={handleUpdate} disabled={isUpdating||approved==="true"}>
            {isUpdating ? "Updating..." : "Approve hotel"}
          </Button>:<Button onClick={handleUnlistUpdate} disabled={Updating}>Unlist Hotel</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersDataTable;
