import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHome from '../../screens/adminScreens/adminHome';


const AdminHero = () => {

  const { adminInfo } = useSelector((state) => state.adminAuth);
  const navigate = useNavigate()
  const navigateToLogin = () => {
    navigate('/admin/login')
  }
  useEffect(() => {
    if (!adminInfo) {
      navigateToLogin()
    }
  }, [adminInfo])

  return (
    <>


      {adminInfo ?
        <>
          <AdminHome />
        </>
        :
        <>

        </>
      }


    </>
  );
};

export default AdminHero;