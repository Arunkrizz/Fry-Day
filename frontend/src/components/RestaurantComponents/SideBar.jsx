
import {Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SideBar({setLocation}) {
  const navigate =useNavigate()

  const navigateToAddProduct =()=>{
    // navigate('/hotel/home/addProduct')
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
        {/* <Link to='/hotel/home/addProduct'> */}
        <MenuItem onClick={navigateToAddProduct}> Add Product </MenuItem>
        {/* </Link> */}
        {/* <MenuItem> Line charts </MenuItem> */}
      </SubMenu>
      <SubMenu label="Post">
        {/* <Link to='/hotel/home/addProduct'> */}
        <MenuItem onClick={navigateToAddPost}> Add Post </MenuItem>
        {/* </Link> */}
        {/* <MenuItem> Line charts </MenuItem> */}
      </SubMenu>
      {/* <MenuItem> Documentation </MenuItem> */}
      {/* <MenuItem> Calendar </MenuItem> */}
    </Menu>
  </Sidebar>
  );
}
export default SideBar;