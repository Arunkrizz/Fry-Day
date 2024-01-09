import React from 'react'
import PieChart from './PieChart'
import { 
    useAdminGetHotelDashQuery,
     useAdminGetDeptDashboardBoxsQuery,
     useAdminGetRestaurantOrderCountQuery,
     } from "../../slices/adminApiSlice"
import { Box, Button, Flex, Stack, Text, Icon, Image, Center, Heading } from '@chakra-ui/react'
// import { Box, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import BarChart from './BarChart'
import { FaSackDollar, FaUsersBetweenLines } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";


function AdminHome() {
  const { data: useAdminGetHotelDashQuery1, refetch: refetchUseAdminGetHotelDashQuery1 } = useAdminGetHotelDashQuery()
  const { data: boxItems, refetch: refetchBoxItems } = useAdminGetDeptDashboardBoxsQuery()
  const { data: Hotel, refetch: refetchhospitalData} = useAdminGetRestaurantOrderCountQuery()


  return (

    <Box >
      <Flex flexDirection={"column"} mt={10}>
        <Stack
          mb={5}
          flexDirection={"row"}
          justifyContent={"space-between"}
          wrap={"wrap"}
        >
          <Box
            p={2}
            bgColor={"blue.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Text fontWeight={750} fontSize={"large"} color={"gray.800"}>
              {boxItems?.hotel}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
                Restaurants
              </Text>
              <Icon as={FaUtensils} boxSize={8}></Icon>
            </Stack>
          </Box>
          <Box
            p={2}
            bgColor={"green.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Text fontWeight={750} fontSize={"large"} color={"gray.800"}>
              {boxItems?.user}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
                Users
              </Text>
              <Icon as={FaUsers} boxSize={8}></Icon>
            </Stack>
          </Box>
          <Box
            p={2}
            bgColor={"blue.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Text fontWeight={750} fontSize={"large"} color={"gray.800"}>
              {boxItems?.order}
            </Text>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"}>
                Orders
              </Text>
              <Icon as={FaReceipt} boxSize={8}></Icon>
            </Stack>
          </Box>
          <Box
            p={2}
            bgColor={"green.100"}
            minW={40}
            minH={20}
            maxW={40}
            maxH={20}
            borderRadius={5}
          >

            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text
                fontWeight={750}
                fontSize={"large"}
                color={"gray.800"}
              >
                {boxItems?.post}
              </Text>

            </Flex>

            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              pr={2}
              alignItems={"flex-end"}
            >
              <Text fontWeight={600} color={"gray.800"} lineHeight={1}>
              Posts
              </Text>
              <Icon as={FaNewspaper} boxSize={8}></Icon>
            </Stack>
          </Box>

        </Stack>

      </Flex>

      {useAdminGetHotelDashQuery1 ?
        <Box>
          <Center style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        
             <Box mt="20">
              <Center>
              <Heading fontSize={"lg"}>Restaurants</Heading>
              </Center>
            {useAdminGetHotelDashQuery1&&<PieChart data={useAdminGetHotelDashQuery1} style={{ flex: '1 1 50%' }} />}
            </Box>
            <Box>
            <Center>
              <Heading fontSize={"xl"}>Orders</Heading>
              </Center>
            {Hotel&&<BarChart style={{ flex: '1 1 50%' }} data={Hotel} />}
            </Box>

          </Center>
        </Box> : null
      }

    </Box>

  )
}

export default AdminHome
