import { CloseButton, Flex, Link, Select, useColorModeValue,useDisclosure } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import {PRODUCT_IMAGE_DIR_PATH} from  '../../utils/constants'
import DeleteAlert from './DeleteProductAlert'


const QuantitySelect = (props) => {
  return (
    <Select
      maxW="70px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      {props.value >= 3 && (
  <>
    <option value={props.value - 2}>{props.value - 2}</option>
    <option value={props.value - 1}>{props.value - 1}</option>
  </>
)}
      
      <option value={props.value}>{props.value}</option>
      <option value={props.value +1}>{props.value+1}</option>
      <option value={props.value + 2}>{props.value+2}</option>
    </Select>
  )
}

export const CartItem = (props) => {
  const {
    isGiftWrapping,
    name =props.product.title,
    description=props.product.description,
    quantity =props.quantity,
    image=PRODUCT_IMAGE_DIR_PATH+props.product.images[0],
    currency ="INR",
    price = props.product.price,
    changeProductQuantity =props.changeProductQuantity ,
    removeProduct = props.removeProduct,
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
   
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      align="center"
    >
       {/* {console.log(props,"props")} */}
      <CartProductMeta
        name={name}
        description={description}
        image={image}
        // isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            const count = e.target.value;
            changeProductQuantity(props._id,props.item,count)
            // console.log('Selected value:', count);
          }}
        />
        <PriceTag price={price} currency={currency} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={(e) => {
            onOpen()
            // removeProduct(props._id,props.item)
            // console.log('Selected value:', count);
          }} />
          <DeleteAlert isOpen={isOpen} onOpen={onOpen} onClose={onClose} removeProduct={props.removeProduct} cartId={props._id} proId={props.item} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <Link fontSize="sm" textDecor="underline"
        onClick={(e)=>{
          onOpen()
          // removeProduct(props._id,props.item)
        }
          }>
          Delete
        </Link>
        <QuantitySelect
          value={props.quantity}
          onChange={(e) => {
            const count = e.target.value;
            changeProductQuantity(props._id,props.item,count)
            // console.log('Selected value:', count);
          }}
        />
        <PriceTag price={props.product.price} currency={currency} />
      </Flex>
    </Flex>
  )
}