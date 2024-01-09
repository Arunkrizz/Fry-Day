import React ,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice.js';
import { logout } from '../../slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchDrawer from './SearchDrawer.jsx';

import { PROFILE_IMAGE_DIR_PATH } from "../../utils/constants";


import {
  IconButton,
  Avatar,
  CloseButton,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiShoppingCart,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSearch
} from 'react-icons/fi';



const LinkItems = [
  { name: 'Home', icon: FiHome ,path: '/user/home' },
  { name: 'Messages', icon: FiCompass,path: '/user/chat' },
  { name: 'Cart', icon: FiShoppingCart,path: '/user/cart'  },
];


function AdminHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure()
   
 

  return (
    <div>
       <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet/>
      </Box>
    </Box>
    </div>
  )
}

export default AdminHeader

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate()
  const [showSearchBar,setShowSearchBar] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  


    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Fry~Day
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>

        <NavItem  icon={FiSearch} onClick={()=>{
          setShowSearchBar(true)
          setDrawerOpen(true)
          
        }}>
          Search
           {drawerOpen? <SearchDrawer setDrawerOpen={setDrawerOpen} />: null}
          </NavItem>
         
        
        {LinkItems.map((link) => (
          //  <Link key={link.name} to={link.path}>
           <NavItem key={link.name} icon={link.icon} onClick={()=>{navigate(link.path)}}>
            {link.name}
          </NavItem>
          //  </Link>
         
        ))}

          
        
      </Box>
    );
  };
  
  import { Box, Icon } from '@chakra-ui/react';
  
  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Box as="a" href="#" textDecoration="none" _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  };
  
  
  import {
    Flex,
  } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
  
  const MobileNav = ({ onOpen, ...rest }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();

  const logOutHandler = async () => {

    try {

      await logoutApiCall().unwrap();

      dispatch(logout());

      navigate('/');

    } catch (err) {

      console.log(err);

    }

  }
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg="white"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}
      >
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Fry~Day
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems="center">
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size="sm"
                    src={(!userInfo?.profileImageName?.startsWith('http')) ? (`${PROFILE_IMAGE_DIR_PATH}${userInfo?.profileImageName}`) : `${userInfo?.profileImageName}`}

                  />
                  <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                    <Text fontSize="sm">{userInfo?.name}</Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg="white" borderColor="gray.200">
                <LinkContainer to='/user/profile'>
                <MenuItem>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to='/user/myOrders'>
                <MenuItem>my orders</MenuItem>
                </LinkContainer>
              
                <MenuDivider />
                <MenuItem onClick={logOutHandler} >Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };
  