import { useState, useEffect } from 'react';
import FormContainer from '../../components/UserComponents/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/UserComponents/Loader';
import { useAddProductMutation, useGetCategoriesMutation } from '../../slices/hotelApiSlice';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [price,setPrice] = useState('')
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [getCategories] = useGetCategoriesMutation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoryData = response.data.categoryData;
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(Array.from(files)); // Convert files to an array
    setImagePreviews(previews);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);
    const selectedCategory = categories.find((cat) => cat._id === selectedCategoryId);
    console.log("selectedCategory: ", selectedCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !categoryId || images.length === 0) {
      toast.error('Please fill out all required fields.');
      return;
    }

    if (images.length > 3) {
      toast.error('You can upload up to 3 images.');
      return;
    }

    for (let i = 0; i < images.length; i++) {
      const fileType = images[i].type.split('/')[0];
      if (fileType !== 'image') {
        toast.error('Please upload only images (JPEG, PNG, etc.).');
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', categoryId);
      formData.append('price', price);
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await addProduct(formData).unwrap();
      console.log("response: ", response);
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h1>Sell Your Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Price</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={categoryId}
            onChange={handleCategoryChange}
            // onChange={(e) => setCategoryId(e.target.value)}
          >
            {/* Populate categories dynamically */}
            <option value="">Select category</option>
            {categories.map((categoryOption) => (
              <option key={categoryOption._id} value={categoryOption._id}>
                {categoryOption.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="images">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple name="images" onChange={handleImageChange} />
          <Row className="mt-3">
            {imagePreviews.map((preview, index) => (
              <Col key={index} xs={4} className="mb-3">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  style={{ width: '100%', height: '100%' }}
                />
              </Col>
            ))}
          </Row>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Add Product
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddProduct
