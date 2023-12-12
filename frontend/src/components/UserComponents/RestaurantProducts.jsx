'use client'
import { toast } from "react-toastify";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button
} from '@chakra-ui/react'

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

import {PRODUCT_IMAGE_DIR_PATH }from '../../utils/constants'
import axios from 'axios'

  export default function RestaurantProducts({product}) {

// console.log(product,"card ui")
const addToCart =(proId)=>{
  try {
    axios.post('/api/users/addToCart', {
     proId: proId,
    //  hotelInfo:hotelInfo.hotelInfo._id
     // other data you want to send
   }).then((response)=>{
    if(response.data.status){
      toast.success("Added to cart successfully.")
    }else{
      toast.error("error occured")
    }
    // console.log(response.data.status,"added to cart")
  }).catch((err)=>{
    toast.error("error occured!!")
  })
  //  console.log('Data sent successfully');
 } catch (error) {
   console.error('Error sending data to the backend', error);
 }
}

  return (
    <Center py={12}
    >
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        mr={6}
        mt={9}
        
        >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={PRODUCT_IMAGE_DIR_PATH+product.images[0]}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {product.title}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {product.description}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              ${product.price}
            </Text>
            {/* <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text> */}
            
          </Stack>
          <Button onClick={(e)=>{addToCart(product._id)}}>Add to Cart </Button>
        </Stack>
      </Box>
    </Center>
  )
}