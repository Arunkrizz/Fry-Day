import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Card,
    Text,
    Image,
    VStack,
    HStack,
    Spacer,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogOverlay,
    Divider,
  } from '@chakra-ui/react'
  import { toast } from 'react-toastify'
  import React, { useEffect, useRef, useState } from 'react'
  import { useCommentPostMutation, useCommentDeleteMutation } from '../../slices/userApiSlice';
  import { DeleteIcon } from '@chakra-ui/icons'
  import { useSelector } from 'react-redux';
  
  const CommentsModal = ({setPostRefresh,postRefresh, post, isOpen, onClose, onCommentPost, formatTimeDifference, setPosts, posts }) => {
    const VITE_PROFILE_IMAGE_DIR_PATH = import.meta.env.VITE_PROFILE_IMAGE_DIR_PATH;
    const btnRef = useRef(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [hoveredCommentIndex, setHoveredCommentIndex] = useState(null);
    const [showDeleteConfirmation,setShowDeleteConfirmation] = useState(false)
    const deleteAlertDialogRef = useRef();
    const { userInfo } = useSelector((state) => state.auth);
    const [commentPost] = useCommentPostMutation();
    const [commentDelete] = useCommentDeleteMutation();
    const isPostButtonDisabled = !newComment.trim();
  
    useEffect(() => {
      if (isOpen) {
        setComments(post ? post.comments || [] : []);
      }
    }, [isOpen, post]);
  
    const handlePostComment = async () => {
      if (!newComment.trim()) {
        return toast.error("Please add a comment");
      }
      try {
        const response = await commentPost({
          postId: post._id,
          text: newComment,
        }); 
        const addedComment = response?.data.comment;
        setComments([...comments, addedComment]);
        setNewComment('');
        onCommentPost(post._id, addedComment);
      } catch (error) {
        console.error('Error adding comment:', error);
        toast.error('Error adding Comment', error);
      }
    };
  

    const deleteConfirmation=()=>{
      setShowDeleteConfirmation(true)
    }
  
    const handleConfirmDelete = async () => {
       // Check if hoveredCommentIndex is a valid index
      if (hoveredCommentIndex === null || hoveredCommentIndex < 0 || hoveredCommentIndex >= comments.length) {
        console.error('Invalid hoveredCommentIndex');
        toast.error('Error deleting comment');
        return;
      }
      try {
        const response = await commentDelete({ postId: post._id, commentId: comments[hoveredCommentIndex]._id }).unwrap()
        // Update local state (remove the deleted comment)
        const updatedComments = [...comments];
        updatedComments.splice(hoveredCommentIndex, 1);
        setComments(updatedComments);

        const updatedPosts =
    post.comments=[...updatedComments]
        // setPostRefresh(!postRefresh)
        if (response && response.statusCode === 200) {
            toast.warning("Comment Deleted");
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
        toast.error('Error deleting comment', error);
      }
    };
  
    return (
      <>
    
        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Comments</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="stretch" spacing={3}>
                {comments.map((comment, index) => (
                  
                  <React.Fragment key={index}>
                    <Card
                      p={2}
                      variant="outline"
                      overflow="hidden"
                      onMouseEnter={() => {
                        setHoveredCommentIndex(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredCommentIndex(null);
                      }}
                    >
                      <HStack spacing={2} align="center" justifyContent="space-between">
                        <HStack spacing={2} align="center">
                          <Image
                            boxSize="40px"
                            borderRadius="full"
                            src={(!comment?.user.profileImageName.startsWith('https://'))?(`${VITE_PROFILE_IMAGE_DIR_PATH}${comment.user.profileImageName}`):`${comment.user.profileImageName}`}
                            alt={comment?.user.profileImageName}
                            
                          />
                          <b>{comment?.user.name}</b>
                          <p style={{ marginBottom: '0' }}>{comment.text}</p>
                        </HStack>
                        <HStack spacing={2} align="center">
                          <Spacer />
                          {userInfo.id === comment?.user._id && hoveredCommentIndex === index && (
                            <DeleteIcon onClick={handleConfirmDelete} />
                          )}
                        </HStack>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        {formatTimeDifference(comment.date)}
                      </Text>
                    </Card>
                  </React.Fragment>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Input
                value={newComment}
                variant="filled"
                bg="#E0E0E0"
                placeholder="Add a comment..."
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                onClick={handlePostComment}
                disabled={isPostButtonDisabled}
                style={{ cursor: isPostButtonDisabled ? 'not-allowed' : 'pointer' }}
              >
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
          {/* Delete Alert Dialog */}
          <AlertDialog
            isOpen={isDeleteAlertOpen}
            leastDestructiveRef={deleteAlertDialogRef}
            // onClose={handleCloseDeleteAlert}
          >
            <AlertDialogOverlay>
              <AlertDialogContent mx="auto" my="auto" width="20%">
                <AlertDialogBody>
                  <VStack spacing={2} align="stretch">
                    <Button colorScheme="red" onClick={handleConfirmDelete}>Delete</Button>
                    <Divider />
                    {/* <Button onClick={handleCloseDeleteAlert}>Cancel</Button> */}
                  </VStack>
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Modal>
      </>
    );
  };
  
  export default CommentsModal;
  
  
  