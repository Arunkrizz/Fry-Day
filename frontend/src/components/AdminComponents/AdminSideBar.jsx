import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useAdminLogoutMutation } from '../../slices/adminApiSlice.js';
import { logout } from '../../slices/adminAuthSlice.js';



import {
  IconButton,
//   Avatar,
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
  FiStar,
  FiSettings,
  FiMenu,
  FiLayers,
  FiChevronDown,
  FiUser,
  FiAperture,
} from 'react-icons/fi';



// const LinkItems = [
//   { name: 'Home', icon: FiHome },
//   { name: 'Manage Hotels', icon: FiTrendingUp, onClick: () => navigateTo('manageHotels') },
//   { name: 'Explore', icon: FiCompass },
//   { name: 'Favourites', icon: FiStar },
//   { name: 'Settings', icon: FiSettings },
// ];

const navigateTo = (destination) => {
    // Implement your navigation logic here based on the destination
    console.log(`Navigating to ${destination}`);
    // Example using React Router:
    // history.push(`/${destination}`);
  };

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
    
const LinkItems = [
    { name: 'Home', icon: FiHome },
    { name: 'Manage Hotels', icon: FiLayers, onClick: () => navigate('/admin/manage-hotels') },
    { name: 'Manage Users', icon: FiUser, onClick: () => navigate('/admin/manage-users') },
    // { name: 'Favourites', icon: FiStar },
    // { name: 'Settings', icon: FiSettings },
  ];
    const { adminInfo } = useSelector( (state) => state.adminAuth);
  

    return (
        <>
        {adminInfo?
      (<Box
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
          Fry~Day Admin
          
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} onClick={link.onClick}>
            {link.name}
          </NavItem>
        ))}
      </Box>):("")}
      </>
    );
  };
  
  import { Box, Icon } from '@chakra-ui/react';
  
  const NavItem = ({ icon, children, ...rest }) => {

    const { adminInfo } = useSelector( (state) => state.adminAuth);

  
    return (
    <>
   {adminInfo?
    (<Box as="a" href="#" textDecoration="none" _focus={{ boxShadow: 'none' }}>
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
      </Box>):("")}

      </>
    );
  };
  
  
  import {
    Flex,
  } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
  
  const MobileNav = ({ onOpen, ...rest }) => {
    
    const { adminInfo } = useSelector( (state) => state.adminAuth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [ logoutApiCall ] = useAdminLogoutMutation();
  
    const logOutHandler = async () => {
  
      try {
      
        await logoutApiCall().unwrap();
  
        dispatch( logout() );
  
        navigate( '/admin' );
  
      } catch (err) {
  
        console.log( err );
  
      }
  
    }
    return (
        <>
{adminInfo? 
      (<Flex
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
          {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
          <Flex alignItems="center">
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  {/* <Avatar
                    size="sm"
                    src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
                  /> */}
                  <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                    {/* <Text fontSize="sm">{adminInfo.name}</Text> */}
                    {/* <Text fontSize="xs" color="gray.600">Admin</Text> */}
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg="white" borderColor="gray.200">
                <LinkContainer to='/admin/profile'>
                <MenuItem>Profile</MenuItem>
                </LinkContainer>
                {/* <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem> */}
                <MenuDivider />
                <MenuItem onClick={logOutHandler} >Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>):("")}
      </>
    );
  };
  