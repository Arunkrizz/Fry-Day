import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text, Image, Flex, Avatar, Box, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { POST_IMAGE_DIR_PATH } from '../../utils/constants'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/viewHotelSlice'
import { useNavigate } from 'react-router-dom';
import { useGetHotelDetailsMutation, useReportPostMutation } from '../../slices/userApiSlice';
import { useEffect, useState } from 'react';
import CommentsModal from './CommentsModal';
import moment from 'moment';
import { useDisclosure, ChakraProvider, useToast } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import ReportModal from "../../components/UserComponents/ReportModal";
import PostLikedByModal from '../../components/UserComponents/PostLikedByModal';





const PostCard = ({ setPostRefresh, postRefresh, handleLikeClick, setPost, setLocation, ...post }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [postToReport, setPostToReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const dispatch = useDispatch();
  const navigate = useNavigate()
  const toast = useToast();
  const [commentModalPost, setCommentModalPost] = useState(null);
  const { isOpen: isCommentsModalOpen, onOpen: onOpenCommentsModal, onClose: onCloseCommentsModal } = useDisclosure();
  const { userInfo } = useSelector((state) => state.auth);




  const [fetchHotelData] = useGetHotelDetailsMutation()
  const [reportPost] = useReportPostMutation();


  const handleReport = async (postId, reportDetails) => {
    try {
      if (!postId) {
        console.error("postId is not available");
        return;
      }

      const response = await reportPost({ postId, data: reportDetails });
      console.log("response", response);
      if (response.data.message === "Report submitted successfully") {
        toast.success("Post reported successfully!");
        setShowReportModal(false);
        setIsReported(true)
      } else {
        console.error("Error reporting post:", response);
        toast.error("Failed to report post");
      }
      setPostToReport(null);
    } catch (error) {
      console.error("Error reporting post:", error);
      toast.error("Failed to report post");
    }
  };

  const handleReportModal = async (postId) => {
    setShowReportModal(true);
    setPostToReport(postId);
    console.log(postId, "setPostToReport", setPostToReport);
  }


  const formatTimeDifference = (timestamp) => {
    const now = moment();
    const postTime = moment(timestamp);

    const diffInMinutes = now.diff(postTime, 'minutes');
    const diffInHours = now.diff(postTime, 'hours');
    const diffInDays = now.diff(postTime, 'days');

    if (diffInMinutes < 60) {
      return `Updated ${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      return `Updated ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 7) {
      return `Updated ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return `Updated on ${postTime.format('MMMM DD, YYYY')}`;
    }
  };


  const handleCommentPost = (postId, addedComment) => {
    const updatedPosts =
    post.post.comments=[... post.post.comments,addedComment]

    if (addedComment) {
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  const handleCommentClick = (event, postId) => {
    event.stopPropagation(); // Prevent the event from propagating to the parent (Card) click handler
    if (!userInfo) {
      navigate('/login')
    }
    // Find the post based on postId
    // const postDetails = post.find((post) => post._id === postId);
    // console.log(post.post, "p-p");
    setCommentModalPost(post.post);
    onOpenCommentsModal();
  };


  // useEffect(()=>{
  const fetchHotel = async () => {
    try {
      const responseFromApiCall = await fetchHotelData({ id: post.post.stores })
      console.log(responseFromApiCall,"view hotel fetch",post,"post clicked")
      dispatch(setCredentials(responseFromApiCall.data));
    } catch (error) {

    }
  }

  const viewHotelHandler = async () => {

    try {

      await fetchHotel()

      navigate('/user/home/restaurant');

      setLocation('/user/home/restaurant')




    } catch (err) {

      console.log(err, "viewhotelHandler");

    }

  }

  const imageUrl = POST_IMAGE_DIR_PATH + post?.post?.images[0]

  return (

    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
      >

        <Card
          maxW='md'
          mt={10}
          pl={6}
          pr={6}

        >
          <CardHeader>
            <Flex spacing='4'>
              <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>

                <Box>
                  <Heading size='sm'>{post.post.title}</Heading>
                  <Text> {post.post.description}</Text>
                </Box>
              </Flex>
              <Menu>
                <MenuButton
                  ml={5}
                  as={IconButton}
                  variant='ghost'
                  colorScheme='gray'
                  aria-label='See menu'
                  icon={<BsThreeDotsVertical />}
                />
                <MenuList>
                  <MenuItem onClick={() => handleReportModal(post.post._id)}>Report</MenuItem>

                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody>

          </CardBody>
          <Image
            objectFit='cover'
            maxW={{ base: '400px', sm: '400px' }}
            aspectRatio={16 / 9}
            src={imageUrl}
            alt='Caffe Latte'
            width="800px"
          // h={'200px'}
          // w={'200px'}
          />

          <CardFooter
            justify='space-between'
            flexWrap='wrap'
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          >
        
            <Box>
              <Button flex='1' variant='ghost' leftIcon={<BiLike />} style={{ color: post.post.isLiked ? 'blue' : '' }} onClick={(event) => handleLikeClick(event, post.post._id)}>
                
              </Button>
              <Text mt={2} textAlign="center" onClick={handleOpenModal} _hover={{ cursor: 'pointer' }}>
                {post?.post?.likes?.length>1?(post?.post?.likes?.length+"  Likes"):((post?.post?.likes?.length==1)?(post?.post?.likes?.length+" Like"):"")} 
              </Text>
            </Box>
            
            <Button flex='1' variant='ghost' onClick={(event) => handleCommentClick(event, post._id)} leftIcon={<BiChat />}>
            </Button>
         
            <Button flex='1' variant='ghost' onClick={viewHotelHandler}>
              View More..
            </Button>
        
          </CardFooter>
        </Card> 
        <CommentsModal post={commentModalPost} isOpen={isCommentsModalOpen} onClose={onCloseCommentsModal} onCommentPost={handleCommentPost} formatTimeDifference={formatTimeDifference} setPosts={setPost} posts={post} postRefresh={postRefresh} setPostRefresh={setPostRefresh} />
        
        {showReportModal && (
          <ReportModal
            showModal={showReportModal}
            handleClose={() => {
              setShowReportModal(false);
            }}
            handleReport={handleReport}
            postToReport={postToReport}
          />
        )}
        <PostLikedByModal show={showModal} handleClose={handleCloseModal} users={post?.post.likes}/>
      </Flex>
    </>


  );
};


export default PostCard;
