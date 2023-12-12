import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useDisclosure 
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import React, { lazy, Suspense, useState } from 'react';
const AddressModal = lazy(() => import('./DeliveryAddressModal'));

const OrderSummaryItem = (props) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

export const CartOrderSummary = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showDeliveryAddressModal, setShowDeliveryAddressModal] = useState(false)

  const addressSubmitHandler = (data) => {
    console.log(data.pincode,"addresssubhndler");
  }

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        {props.cartItems.map((item, i) => (
          <OrderSummaryItem key={i} label="Subtotal" value={formatPrice(item.quantity * item.product.price)} />
        ))}
        {/* <OrderSummaryItem label="Subtotal" value={formatPrice(props.total)} /> */}
        {/* <OrderSummaryItem label="Shipping + Tax">
            <Link href="#" textDecor="underline">
              Calculate shipping
            </Link>
          </OrderSummaryItem> */}
        {/* <OrderSummaryItem label="Coupon Code">
            <Link href="#" textDecor="underline">
              Add coupon code
            </Link>
          </OrderSummaryItem> */}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(props.total)}
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={
        ()=>{
          setShowDeliveryAddressModal(true)
          onOpen()
        }}>
        Checkout
      </Button>
      <Suspense fallback={<div>Loading...</div>}>
       { showDeliveryAddressModal&&<AddressModal
          showDeliveryAddressModal={showDeliveryAddressModal}
          setShowDeliveryAddressModal={setShowDeliveryAddressModal}
          submitHandler={addressSubmitHandler}
           isOpen={isOpen}
            onOpen={onOpen}
             onClose={onClose} 


        />}
      </Suspense>
    </Stack>
  )
}