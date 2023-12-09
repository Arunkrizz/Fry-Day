import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Button,Text ,Image} from '@chakra-ui/react'
import {POST_IMAGE_DIR_PATH} from  '../../utils/constants'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import {setCredentials} from '../../slices/viewHotelSlice'
import { useNavigate } from 'react-router-dom';
import { useGetHotelDetailsMutation } from '../../slices/userApiSlice';
import { useEffect } from 'react';



const PostCard = ({setLocation,...post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [fetchHotelData] = useGetHotelDetailsMutation()


// useEffect(()=>{
  const  fetchHotel = async()=>{
    try {
      // console.log("hotel");
      const responseFromApiCall = await fetchHotelData({id:post.post.stores})
      // console.log(responseFromApiCall,"hotel details")
      dispatch( setCredentials(responseFromApiCall.data) );
    } catch (error) {
      
    }
   }

  //  fetchHotel()
// },[])

  const viewHotelHandler = async () => {

    try {

      await fetchHotel()
    
      navigate( '/user/home/restaurant' );

      setLocation('/user/home/restaurant')


      // dispatch( setCredentials({id:post.post.stores}) );

      

    } catch (err) {

      console.log( err,"viewhotelHandler" );

    }

  }

    const imageUrl=POST_IMAGE_DIR_PATH+post.post.images[0]
    // console.log(imageUrl,post,"postting")
  return (
  //  <div style={{marginTop:"50px"}}>
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  mt={10}
  size={'lg'}
  width="800px"  // Adjust the width as needed
  height="400px" // Adjust the height as needed
>
  <Image
    objectFit='cover'
    maxW={{ base: '400px', sm: '400px' }}
    aspectRatio={16 / 9} 
    src={imageUrl}
    alt='Caffe Latte'
    // width="800px" 
    // h={'200px'}
  // w={'200px'}
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{post.post.title}</Heading>
      {/* <Heading size='md'>{post.post._id}</Heading> */}
      <Text py='2'>
       {post.post.description}
      </Text>
    </CardBody>

    <CardFooter>
     
      
      <Button ml={5} variant='solid' colorScheme='blue' 
      onClick={viewHotelHandler}>
        View More..
      </Button>
      
    </CardFooter>
  </Stack>
</Card>
    // </div>
  );
};

// PostCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   imageUrl: PropTypes.string.isRequired,
//   postedOn: PropTypes.string.isRequired,
// };

export default PostCard;
