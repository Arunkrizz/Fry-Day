import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'

  import React from 'react'; // Import React
  import { Button } from '@chakra-ui/react';

  function DeleteAlert(props) {
    const { isOpen, onOpen, onClose ,removeProduct ,cartId, proId} = props
    const cancelRef = React.useRef()
  
    return (
      <>
      
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Product
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? 
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={(e)=>{
                     removeProduct(cartId, proId)
                     onClose()}} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  export default DeleteAlert