import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ProgressBarContext } from '../../../store/progressBarStore.jsx';
import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { useHotelRegisterMutation } from "../../slices/hotelApiSlice.js";
import { toast } from "react-toastify";
import { Row, Col } from 'react-bootstrap';
import { setCredential } from "../../slices/hotelAuthSlice";
import { useDispatch } from 'react-redux';





function CheckApiExample() {
    const { postDetails, setPostDetails, handleNext } = useContext(ProgressBarContext);
    const [hotelRegister] = useHotelRegisterMutation();
    const [selectedOption, setSelectedOption] = useState(null);
    const [describeCheckedValues, setDescribeCheckedValues] = useState([]);
    const [checkedCuisineValues, setCheckedCuisineValues] = useState([]);
    const [restaurantImages, setRestaurantImages] = useState([]);
    const [menuImages, setMenuImages] = useState([]);
    const [foodImages, setFoodImages] = useState([]);
    const [resImagePreviews, setResImagePreviews] = useState([]);
    const [menuImagePreviews, setMenuImagePreviews] = useState([]);
    const [foodImagePreviews, setFoodImagePreviews] = useState([]);
    const dispatch = useDispatch();

    const isFormValid = () => {
        // Check if every field is filled
        if (
            selectedOption === null ||
            describeCheckedValues.length === 0 ||
            checkedCuisineValues.length === 0 ||
            restaurantImages.length === 0 ||
            foodImages.length === 0 ||
            menuImages.length ===0
        ) {
            // Return false if any field is empty
            return false;
        }
        if (restaurantImages.length > 3) {
            toast.error('You can upload up to 3 images.');
            return false  
          }
          if (foodImages.length > 3) {
            toast.error('You can upload up to 3 images.');
            return false;
          }
          if (menuImages.length > 3) {
            toast.error('You can upload up to 3 images.');
            return false;
          }
      
          for (let i = 0; i < restaurantImages.length; i++) {
            const fileType = restaurantImages[i].type.split('/')[0];
            if (fileType !== 'image') {
              toast.error('Please upload only images (JPEG, PNG, etc.).');
              return false;
            }
          }
          for (let i = 0; i < foodImages.length; i++) {
            const fileType = foodImages[i].type.split('/')[0];
            if (fileType !== 'image') {
              toast.error('Please upload only images (JPEG, PNG, etc.).');
              return false;
            }
          }
          for (let i = 0; i < menuImages.length; i++) {
            const fileType = menuImages[i].type.split('/')[0];
            if (fileType !== 'image') {
              toast.error('Please upload only images (JPEG, PNG, etc.).');
              return false;
            }
          }
          
        // Return true if all fields are filled
        return true;
    };


    const handleSubmitClick = () => {

        if (isFormValid()) {

            handleNext()
            submitHandler()
        } else {
            // Display an error message or take other actions as needed
            toast.error('Please fill in all fields before proceeding.');
        }

    };

    const handleMenuDeleteImage = (index) => {
        const newPreviews = [...menuImagePreviews];
        const newMenuImages = [...menuImages]
        newPreviews.splice(index, 1);
        newMenuImages.splice(index,1)

        setMenuImagePreviews(newPreviews);
        setMenuImages(newMenuImages)
      }

      const handleFoodDeleteImage = (index) => {
        const newPreviews = [...foodImagePreviews];
        const newFoodImages = [...foodImages]
        newPreviews.splice(index, 1);
        newFoodImages.splice(index,1)

        setFoodImagePreviews(newPreviews);
        setFoodImages(newFoodImages)
      }

      const handleRestaurantDeleteImage = (index) => {
        const newPreviews = [...resImagePreviews];
        const newResImages = [...restaurantImages]
        newPreviews.splice(index, 1);
        newResImages.splice(index,1)

        setResImagePreviews(newPreviews);
        setRestaurantImages(newResImages)
      }

    const submitHandler = async (e) => {

        try {

            const formData = new FormData();
            formData.append('restaurantName', postDetails[0].restaurantName)
            formData.append('restaurantAddress', postDetails[0].restaurantAddress)
            formData.append('ownerName', postDetails[0].ownerName)
            formData.append('ownerEmail', postDetails[0].ownerEmail)
            formData.append('longitude', postDetails[0].accessLongitude)
            formData.append('latitude', postDetails[0].accessLatitude)
            formData.append('mobile', postDetails[0].mobile)
            formData.append('dineAndDelivery', selectedOption)
            formData.append('describeOutlet', describeCheckedValues)
            formData.append('cuisineType', checkedCuisineValues)
            restaurantImages.forEach((image, index) => {
                formData.append('RestaurantImages', image);
            });
            menuImages.forEach((image, index) => {
                formData.append('menuImages', image);
            });
            foodImages.forEach((image, index) => {
                formData.append('foodImages', image);
            });


            const updatedPostDetails = { ...postDetails, dineAndDelivery: selectedOption, describeOutlet: describeCheckedValues, cuisineType: checkedCuisineValues, restaurantImages: restaurantImages, menuImages: menuImages, foodImages: foodImages };

            const responseFromApiCall = await hotelRegister(formData).unwrap();

            dispatch(setCredential({ ...responseFromApiCall }));

        } catch (err) {

            toast.error(err?.data?.message || err?.error);

        }

    }

    const handleRestaurantImageChange = (e) => {
        const files = e.target.files;
        const previews = Array.from(files).map(file => URL.createObjectURL(file));
        setRestaurantImages(Array.from(files)); // Convert files to an array
        setResImagePreviews(previews);
    };

    const handleMenuImageChange = (e) => {
        const files = e.target.files;
        const previews = Array.from(files).map(file => URL.createObjectURL(file));
        setMenuImages(Array.from(files)); // Convert files to an array
        setMenuImagePreviews(previews);
    };

    const handleFoodImageChange = (e) => {
        const files = e.target.files;
        const previews = Array.from(files).map(file => URL.createObjectURL(file));
        setFoodImages(Array.from(files)); // Convert files to an array
        setFoodImagePreviews(previews);
    };

    const handleCuisineCheckboxChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        console.log(checkedCuisineValues, "ff")

        if (isChecked) {
            // Add the value to the checkedValues array
            setCheckedCuisineValues([...checkedCuisineValues, value]);
        } else {
            // Remove the value from the checkedValues array
            setCheckedCuisineValues(checkedCuisineValues.filter(item => item !== value));
        }

    }


    const handleCheckboxChange = (e) => {

        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            // Add the value to the checkedValues array
            setDescribeCheckedValues([...describeCheckedValues, value]);
        } else {
            // Remove the value from the checkedValues array
            setDescribeCheckedValues(describeCheckedValues.filter(item => item !== value));
        }
    }

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);

    };

    const variant = 'Light'
    const type = 'radio'
    const type2 = 'checkbox'
    return (
        <>
            <Card
                bg={variant.toLowerCase()}
                key={"1"}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2"
                style={{ paddingLeft: "20px", paddingTop: '20px', paddingBottom: '50px' }}
            >
                <h3 style={{ paddingBottom: "30px" }}>Restaurant Information</h3>
                <Form>

                    <div key={"radio1"} className="mb-3">
                        <Form.Check type={type} id={`check-api-bothDeliveryAndDineIn`}>
                            <Form.Check.Input
                                type={type}
                                value="bothDeliveryAndDineIn"
                                onChange={handleRadioChange}
                                checked={selectedOption === "bothDeliveryAndDineIn"} />
                            <Form.Check.Label>
                                <h5>Both Delivery and Dine in available</h5>
                            </Form.Check.Label>
                            <Form.Control.Feedback type="valid">
                                <p style={{ color: "grey" }}>Select this option when you have a place for customers to dine-in and also want to
                                    activate online ordering for your restaurant</p>
                            </Form.Control.Feedback>
                        </Form.Check>
                    </div>
                    <div key={"radio2"} className="mb-3">
                        <Form.Check type={type} id={`check-api-DineInOnly`}>
                            <Form.Check.Input
                                type={type}
                                value="DineInOnly"
                                onChange={handleRadioChange}
                                checked={selectedOption === "DineInOnly"} />
                            <Form.Check.Label>
                                <h5>Dine-in only</h5>
                            </Form.Check.Label>
                            <Form.Control.Feedback type="valid">
                                <p style={{ color: "grey" }}>Select when you don’t want to register for online ordering</p>
                            </Form.Control.Feedback>
                        </Form.Check>
                    </div>
                    <div key={"radio3"} className="mb-3">
                        <Form.Check type={type} id={`check-api-DeliveryOnly`}>
                            <Form.Check.Input
                                type={type}
                                value="DeliveryOnly"
                                onChange={handleRadioChange}
                                checked={selectedOption === "DeliveryOnly"} />
                            <Form.Check.Label>
                                <h5>Delivery only</h5>
                            </Form.Check.Label>
                            <Form.Control.Feedback type="valid">
                                <p style={{ color: "grey" }}>Select when you don’t have a facility for customers to dine-in (like delivery kitchens)</p>
                            </Form.Control.Feedback>
                        </Form.Check>
                    </div>

                    <div >
                        <h4>Select options which best describe your outlet</h4>
                        <div key={"check1"} className="mr-3" style={{ display: "flex", marginRight: "5px" }}>
                            <Form.Check type={type2} id={`check-api-Bakery`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Bakery"
                                    onChange={handleCheckboxChange}
                                />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Bakery</h5>
                                </Form.Check.Label>

                            </Form.Check>


                            <Form.Check type={type2} id={`check-api-Food court`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Food court"
                                    onChange={handleCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Food court </h5>
                                </Form.Check.Label>

                            </Form.Check>


                            <Form.Check type={type2} id={`check-api-Sweet shop`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Sweet shop"
                                    onChange={handleCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Sweet shop</h5>
                                </Form.Check.Label>

                            </Form.Check>

                            <Form.Check type={type2} id={`check-api-Beverage Shop`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Beverage Shop"
                                    onChange={handleCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Beverage Shop</h5>
                                </Form.Check.Label>

                            </Form.Check>




                        </div>
                        <div key={"check2"} className="mr-3" style={{ display: "flex", marginRight: "5px" }}>
                            <Form.Check type={type2} id={`check-api-Café`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Café"
                                    onChange={handleCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Café</h5>
                                </Form.Check.Label>

                            </Form.Check>

                            <Form.Check type={type2} id={`check-api-Casual Dining`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Casual Dining"
                                    onChange={handleCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Casual Dining </h5>
                                </Form.Check.Label>

                            </Form.Check>


                            <Form.Check type={type2} id={`check-api-Quick Bites`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Quick Bites"
                                    onChange={handleCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Quick Bites</h5>
                                </Form.Check.Label>

                            </Form.Check>

                            <Form.Check type={type2} id={`check-api-Dessert Parlour`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Dessert Parlour"
                                    onChange={handleCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "50px" }}>Dessert Parlour</h5>
                                </Form.Check.Label>

                            </Form.Check>




                        </div>
                    </div>

                </Form>
            </Card>

            <Card
                bg={variant.toLowerCase()}
                key={"2"}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2"
                style={{ paddingLeft: "20px", paddingTop: '20px', paddingBottom: '20px' }}
            >
                <Form>



                    <div >
                        <h4 style={{ paddingBottom: "5px" }}>Type of cuisines</h4>
                        <p style={{ color: "grey" }} >Select options which best describe food your serve</p>

                        <div key={"check2"} className="mr-3" style={{ display: "flex", marginRight: "5px" }}>
                            <Form.Check type={type2} id={`check-api-Beverages`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Beverages"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>Beverages</h5>
                                </Form.Check.Label>

                            </Form.Check>

                            <Form.Check type={type2} id={`check-api-Biryani`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Biryani"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>Biryani </h5>
                                </Form.Check.Label>

                            </Form.Check>


                            <Form.Check type={type2} id={`check-api-Chinese`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Chinese"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>Chinese</h5>
                                </Form.Check.Label>

                            </Form.Check>

                            <Form.Check type={type2} id={`check-api-Desserts`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Desserts"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>Desserts</h5>
                                </Form.Check.Label>

                            </Form.Check>




                        </div>
                        <div key={"check3"} className="mr-3" style={{ display: "flex", marginRight: "5px" }}>
                            <Form.Check type={type2} id={`check-api-Fast Food`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Fast Food"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>Fast Food</h5>
                                </Form.Check.Label>

                            </Form.Check>

                            <Form.Check type={type2} id={`check-api-North Indian`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="North Indian"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>North Indian</h5>
                                </Form.Check.Label>

                            </Form.Check>


                            <Form.Check type={type2} id={`check-api-South Indian`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="South Indian"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>South Indian</h5>
                                </Form.Check.Label>

                            </Form.Check>

                            <Form.Check type={type2} id={`check-api-Street Food`} >
                                <Form.Check.Input
                                    type={type2}
                                    value="Street Food"
                                    onChange={handleCuisineCheckboxChange} />
                                <Form.Check.Label>
                                    <h5 style={{ marginRight: "40px" }}>Street Food</h5>
                                </Form.Check.Label>

                            </Form.Check>




                        </div>

                    </div>

                </Form>
            </Card>

            <Card
                bg={variant.toLowerCase()}
                key={"3"}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2"
                style={{ paddingLeft: "20px", paddingTop: '20px', paddingBottom: '20px' }}
            >
                <div>
                    <Form.Group className="my-2" controlId="restaurantImages">
                        <Form.Label>Restaurant Images </Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleRestaurantImageChange}
                            multiple
                        ></Form.Control>
                        <Row className="mt-3 mb-5">
                            {resImagePreviews.map((preview, index) => (
                                <Col key={index} xs={4} className="mb-3">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                      <Button variant="danger" style={{marginTop:"10px"}} onClick={() => handleRestaurantDeleteImage(index)}>
                                        Delete
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Form.Group>
                </div>

                <div>
                    <Form.Group className="my-2 mb-5" controlId="profileImage">
                        <Form.Label>Menu Images </Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleMenuImageChange}
                            multiple
                        ></Form.Control>
                        <Row className="mt-3">
                            {menuImagePreviews.map((preview, index) => (
                                <Col key={index} xs={4} className="mb-3">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                    <Button variant="danger" style={{marginTop:"10px"}} onClick={() => handleMenuDeleteImage(index)}>
                                        Delete
                                    </Button>
                                </Col>

                            ))}
                        </Row>
                    </Form.Group>
                </div>

                <div>
                    <Form.Group className="my-2 mb-5" controlId="profileImage">
                        <Form.Label>Food Images </Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleFoodImageChange}
                            multiple
                        ></Form.Control>
                        <Row className="mt-3">
                            {foodImagePreviews.map((preview, index) => (
                                <Col key={index} xs={4} className="mb-3">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                      <Button style={{marginTop:"10px"}} variant="danger" onClick={() => handleFoodDeleteImage(index)}>
                                        Delete
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Form.Group>

                </div>

                <Button variant="outline-info" id="button-addon2" style={{marginTop: "30px"}} onClick={handleSubmitClick}>
                    Next
                </Button>
            </Card>

        </>

    );
}

export default CheckApiExample;