
import {Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import { FaHome, FaSearch,FaHeart,FaUser } from 'react-icons/fa';

function SideBar({setLocation}) {
  const navigate =useNavigate()

  return (
    <Sidebar >
      <h2>Fry~Day</h2>
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