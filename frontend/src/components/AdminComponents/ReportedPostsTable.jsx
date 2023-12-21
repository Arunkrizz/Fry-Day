import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ConfirmReportModal from "./ConfirmReport";
import { useRemoveReportedPostMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import ViewReportedPost from "./viewReportedPost";

const ReportedPostsTable = ({ reportedPosts, setReportedPosts }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showViewPost, setShowViewPost]= useState(false)
    const [removePostByAdmin] = useRemoveReportedPostMutation();
    
    const handleRemoveConfirmation = (post) => {
        console.log("here inn")
        // setSelectedPost(post);
        setShowModal(true);
    };

    const isPostRemoved = (post) => post.isReviewed;

    const getButtonVariant = (post) => (isPostRemoved(post) ? 'secondary' : 'danger');
    const getButtonText = (post) => (isPostRemoved(post) ? 'Post Removed' : 'Remove Post');

    const handleConfirmRemove = async () => {
        try {      
            const reportId = selectedPost.reportId;
            await removePostByAdmin({ reportId: reportId });
            
            toast.success("Post removed Successfully.");
            setSelectedPost(null);
            setShowViewPost(false)
            // Update the reportedPosts array locally
            const updatedPosts = reportedPosts.map(post => {
                if (post.reportId === reportId) {
                    return { ...post, isReviewed: true }; // Assuming isReviewed is the property indicating post removal
                }
                return post;
            });

            setReportedPosts(updatedPosts);
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
        // Update the state or fetch updated data as needed
        // removePost(selectedPost.id).then(() => {
        //   // Update state or fetch updated data
        // });

        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>SI No.</th>
                        <th>Title</th>
                        <th>Uploaded Artist</th>
                        <th>Reported Artist</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedPosts && reportedPosts.map((post, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{post.title}</td>
                            <td>{post.postedUserName}</td>
                            <td>{post.reportedUserName}</td>
                            <td>{post.isReviewed?"Removed":"Review pending"}</td>
                            <td>{post.reportedReason}</td>
                            <td>
                                {/* <Button
                                    type="button"
                                    variant={getButtonVariant(post)}
                                    onClick={() => handleRemoveConfirmation(post)}
                                    disabled={isPostRemoved(post)}
                                >
                                    {getButtonText(post)}
                                </Button> */}
                                <Button onClick={()=>{
                                    setSelectedPost(post);
                                    setShowViewPost(true)
                                }}>View Post</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            

            {/* Confirmation Modal */}
            <ConfirmReportModal
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmRemove}
            />
            <ViewReportedPost showViewPost={showViewPost} setShowViewPost={setShowViewPost} post={selectedPost} handleRemoveConfirmation={handleRemoveConfirmation}/>
        </>
    )};

export default ReportedPostsTable;
