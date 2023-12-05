'use client'

import { Stack, Flex, Button, Text, VStack, useBreakpointValue, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { HOTEL_IMAGE_DIR_PATH } from "../../utils/constants";
import { useEffect, useState } from 'react';
import ChatButton from "../../components/UserComponents/ChatButton";


export default function RestaurantHeroHeader({ hotel, setLocation }) {
  const [restaurantImage, setResataurantImage] = useState('https://imgs.search.brave.com/oUFmFtmqH22qmG0V2SQ3n9B1kM6turLGePwBzJRPJwQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAx/MjU2OTcwOC9waG90/by9yZXN0YXVyYW50/LW1lbnUtdGFibGUt/cGxhY2UtY2FuZGxl/LWxpZ2h0LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1vLTNH/eG1DWHBDT01vWVN6/azNMXzlRNHV6U20y/bDdITDNUNjNWRUVG/ZktzPQ')
  const navigate = useNavigate()
  // console.log(hotel, "res hero header");



  useEffect(() => {
    if (hotel) {
      setResataurantImage(HOTEL_IMAGE_DIR_PATH + hotel.restaurantImages[0])
    }
  }, [hotel])

  const handleViewLocation = () => {
    try {

      setLocation('/user/home/viewHotelLocation')
      navigate('/user/home/viewHotelLocation')
    } catch (error) {

    }

  }
  return (
    <Box
      bgColor={'black'}
    // bgGradient={'linear(to-r, black,  transparent )'}
    >
      <Flex
        w={'full'}
        h={'25vh'}
        backgroundImage={
          `url(${restaurantImage})`
        }
        backgroundSize={'contain'}
        backgroundRepeat={'no-repeat'}

        backgroundPosition={'right center'}

      >
        <VStack
          // w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={'linear(to-r, black,  transparent )'}

        >
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6} >
            <Text
              pt={"3"}
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '1xl', md: '2xl' })}>
              {hotel?.restaurantName}
            </Text>
            <Stack direction={'row'}>
              <Button
                bg={'blue.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
                onClick={handleViewLocation}
              >
                View our Location
              </Button>

              <Button
                bg={'blue.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
            
              >
                 <ChatButton userId={hotel?._id} />
              </Button>

             
              {/* <Button
              bg={'whiteAlpha.300'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              Show me more
            </Button> */}
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </Box>
  )
}