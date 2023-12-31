import React, { useEffect } from 'react'; // Make sure to import React
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,

} from '@chakra-ui/react';
import { CartItem } from '../../components/UserComponents/CartItem';
import { CartOrderSummary } from '../../components/UserComponents/CartOrderSummary';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useState } from 'react'
const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [changeQuantity, setChangeQuantity] = useState(false)
  useEffect(() => {
    const getCartProducts = () => {
      try {

        axios.get('/api/users/getCart').then((response) => {
          console.log(response, "get cart axios");
          if (response.status === 200) {
            setCartItems(response.data.products)
            setTotal(response.data.total)
          }

        })
      } catch (error) {
        console.log("getCartERR", error);
      }
    }
    getCartProducts()
  }, [changeQuantity])

  const changeProductQuantity = (cartId, proId, count) => {
    try {

      axios.post('/api/users/changeProductQuantity', {
        cartid: cartId,
        proId: proId,
        count: count
      }).then((response) => {
        if (response.status === 200) {
          setChangeQuantity(!changeQuantity)
        }

      })
    } catch (error) {
      console.log("getCartERR", error);
    }
  }



  const removeProduct = (cartId, proId) => {
    try {


      axios.post('/api/users/removeCartProduct', {
        cartid: cartId,
        proId: proId
      }).then((response) => {
        if (response.status === 200) {
          setChangeQuantity(!changeQuantity)
        }

      })
    } catch (error) {
      console.log("getCartERR", error);
    }
  }





  return (
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({cartItems.length} items)
          </Heading>

          <Stack spacing="6">
            {cartItems?.map((item) => (
              <CartItem key={item.item} {...item} changeProductQuantity={changeProductQuantity} removeProduct={removeProduct} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          {cartItems.length !== 0 && <CartOrderSummary cartItems={cartItems} total={total} />}
        </Flex>
      </Stack>
    </Box>
  )
}

export default Cart;
