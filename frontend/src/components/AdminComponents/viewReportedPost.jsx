import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";


import React from 'react'

const viewReportedPost = ({showViewPost,setShowViewPost,handleRemoveConfirmation,post}) => {

const handleRemoveConfirmations=()=>{
    console.log("remove confirmation");
    handleRemoveConfirmation(post)
}

  return (
    <Modal show={showViewPost} onHide={() => setShowViewPost(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Reported Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
       <h5>ReportdId:{post?.reportId}</h5> 
       <h5>Postedby:{post?.postedUserName}</h5> 
       <h5>Reportedby:{post?.reportedUserName}</h5> 
       <h5>Reason:{post?.reportedReason}</h5> 
       <h5>Post title:{post?.title}</h5> 
       <img
          src={'http://localhost:5000/PostImages/'+ post?.image}
          alt={"RES IMG"}
          style={{
            width: "150px",
            height: "150px",
            // borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
          }}
        /> 
    {/* {console.log(post)} */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() =>setShowViewPost(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={(e)=>{handleRemoveConfirmations(post)}} disabled={post?.isReviewed}>
        {!post?.isReviewed?"Remove Post":"Removed"}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default viewReportedPost