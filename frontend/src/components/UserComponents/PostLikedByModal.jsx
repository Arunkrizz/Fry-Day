
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {Image } from '@chakra-ui/react'

const PostLikedByModal = ({ show, handleClose, users }) => {
    const VITE_POST_IMAGE_DIR_PATH = import.meta.env.VITE_POST_IMAGE_DIR_PATH;
    
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Liked by:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
            {/* {console.log(users,"liked modal")} */}

          {users.map((user, index) => (
         <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
         <Image
           boxSize="40px"
           borderRadius="full"
           src={(!user?.profileImageName?.startsWith('https://')) ? (`${VITE_POST_IMAGE_DIR_PATH}${user?.profileImageName}`) : `${user?.profileImageName}`}
           alt={user?.profileImageName}
         />
         <p style={{ marginLeft: '10px' }}>{user?.name}</p>
       </div>
            
          ))}
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close Modal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostLikedByModal;
