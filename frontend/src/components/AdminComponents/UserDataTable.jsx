import { useState } from "react";
import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useUpdateUserByAdminMutation,useBlockUnblockUserMutation } from "../../slices/adminApiSlice";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const UsersDataTable = ({ users ,setUpdated,updated}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for the update modal
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userNameToUpdate, setUserNameToUpdate] = useState("");
  const [userEmailToUpdate, setUserEmailToUpdate] = useState("");
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [updateUserByAdmin, { isLoading: isUpdating }] = useUpdateUserByAdminMutation();
  const [blockUnblockUser] = useBlockUnblockUserMutation()

  //alert confirmation
  const submit = (user) => {
    confirmAlert({
      title: 'Confirm to Block',
      message: 'Are you sure ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUpdateStatus(user)
        },
        {
          label: 'No',
          onClick: () => {return false}
        }
      ]
    });
  };

const handleBlockUnblockUser = async (user) =>{
  
if(!user.is_blocked){

  submit(user)

}else{
  handleUpdateStatus(user)
}

  }



const handleUpdateStatus = async (user)=>{
  try {
    console.log(user.is_blocked,"blkunblk")
    const responseFromApiCall = await blockUnblockUser({
      userId: user._id
    })
    toast.success("User Updated Successfully.");
    setUserIdToUpdate(null); // Clear the user ID to update

    if(updated){
      setUpdated(false)
    }else{
      setUpdated(true)
    }
    

  } catch (error) {
    console.log(error);
  }
 
}

  const handleOpenUpdateModal = (user) => {
    setUserIdToUpdate(user._id)
    setUserNameToUpdate(user.name);
    setUserEmailToUpdate(user.email);
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    try {
      const responseFromApiCall = await updateUserByAdmin({
        userId: userIdToUpdate,
        name: userNameToUpdate,
        email: userEmailToUpdate
      });
      toast.success("User Updated Successfully.");
      setUserIdToUpdate(null); // Clear the user ID to update
      setShowUpdateModal(false); // Close the update modal

      
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>

<BootstrapForm>
        <BootstrapForm.Group className="mt-3" controlId="exampleForm.ControlInput1">
          <BootstrapForm.Label>Search users:</BootstrapForm.Label>
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
            <th> Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
           
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  type="button"
                  variant="primary"
                  className="mt-3"
                  onClick={() => handleBlockUnblockUser(user)}
                >
                 {user.is_blocked ?"Unblock":"Block"} 
                </Button>
              </td>
            </tr>
             
          ))}
        </tbody>
      </Table>

      {/* Update User Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapForm>
            <BootstrapForm.Group controlId="name">
              <BootstrapForm.Label>Name</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                value={userNameToUpdate}
                onChange={(e) =>
                    setUserNameToUpdate(e.target.value)
                }
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="email">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <BootstrapForm.Control
                type="email"
                value={userEmailToUpdate}
                onChange={(e) =>
                    setUserEmailToUpdate(e.target.value)
                }
              />
            </BootstrapForm.Group>
          </BootstrapForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersDataTable;
