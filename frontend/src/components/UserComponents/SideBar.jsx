
import {Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import { FaHome, FaSearch,FaHeart,FaUser } from 'react-icons/fa';

function SideBar({setLocation}) {
  const navigate =useNavigate()

  // const navigateToAddProduct =()=>{
  //   // navigate('/hotel/home/addProduct')
  //   setLocation('/hotel/home/addProduct')
  //   navigate('/hotel/home/addProduct')
  // }

  // const navigateToAddPost =()=>{
  //   setLocation('/hotel/home/addPost')
  //   navigate('/hotel/home/addPost')
  // }

  return (
    <Sidebar >
      <h2>Fry~Day</h2>
    {/* <Menu>
    <MenuItem onClick={"navigateToAddProduct"}> Add Product </MenuItem>
      
    </Menu> */}
     <Menu iconShape="square">
        <MenuItem icon={<FaHome />}>Home</MenuItem>
        <MenuItem icon={<FaSearch />}>Search</MenuItem>
        <MenuItem icon={<FaHeart />}>Favorite</MenuItem>
       <MenuItem icon={<FaUser />}>Profile</MenuItem>
      </Menu>
  </Sidebar>
  );
}
export default SideBar;