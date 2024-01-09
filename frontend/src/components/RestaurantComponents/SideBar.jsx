
import {Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SideBar({setLocation}) {
  const navigate =useNavigate()

  const navigateToAddProduct =()=>{
    setLocation('/hotel/home/addProduct')
    navigate('/hotel/home/addProduct')
  }

  const navigateToAddPost =()=>{
    setLocation('/hotel/home/addPost')
    navigate('/hotel/home/addPost')
  }

  return (
    <Sidebar >
    <Menu>
      <SubMenu label="Products">
        <MenuItem onClick={navigateToAddProduct}> Add Product </MenuItem>

      </SubMenu>
      <SubMenu label="Post">
        <MenuItem onClick={navigateToAddPost}> Add Post </MenuItem>
      </SubMenu>
    </Menu>
  </Sidebar>
  );
}
export default SideBar;