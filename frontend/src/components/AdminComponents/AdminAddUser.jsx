import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAddUserMutation } from "../../slices/adminApiSlice";




function AdminAddUser() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const [addUserByAdmin, { isLoading: isUpdating }] = useAddUserMutation();


    const handleAddUser = async () => {
        try {
            const responseFromApiCall = await addUserByAdmin({

                name: userName,
                email: userEmail,
                password:userPassword

            })
            if(responseFromApiCall){
                console.log(responseFromApiCall)
                toast.success("User Added Successfully.")}
            else{
                console.log("err")
                toast.error("error occured")}
            // toast.success("User Added Successfully.");
            setShowAddUserModal(false); // Close the update modal

            // Reload the page to reflect the updated data
            window.location.reload();

        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    };

    const handleOpenAddUserModal = () => {
     
        setShowAddUserModal(true);
        // console.log(showAddUserModal,"shown")
      };

    return (
        <>

            <Button
                type="button"
                variant="primary"
                className="mt-3"
                onClick={() => handleOpenAddUserModal()}
            >
                Add User
            </Button>

            {/* Add User Modal */}
            <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BootstrapForm>
                        <BootstrapForm.Group controlId="name">
                            <BootstrapForm.Label>Name</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="text"
                                value={userName}
                                onChange={(e) =>
                                    setUserName(e.target.value)
                                }
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="email">
                            <BootstrapForm.Label>Email</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="email"
                                value={userEmail}
                                onChange={(e) =>
                                    setUserEmail(e.target.value)
                                }
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="password">
                            <BootstrapForm.Label>Password</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="password"
                                value={userPassword}
                                onChange={(e) =>
                                    setUserPassword(e.target.value)
                                }
                            />
                        </BootstrapForm.Group>
                    </BootstrapForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddUserModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddUser} disabled={isUpdating}>
                        {isUpdating ? "Adding..." : "Add User"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminAddUser
