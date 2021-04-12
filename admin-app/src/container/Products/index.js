import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';

/**
* @author
* @function Products
**/

const Products = (props) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState('');
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  const handleProductPictures = (e) =>{
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }


  console.log(productPictures)


  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="name"
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)} />

          <Input
            label="price"
            value={price}
            placeholder={`Pice`}
            onChange={(e) => setPrice(e.target.value)} />

          <Input
            label="Description"
            value={description}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)} />

          <select className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)} >
            <option> select category</option>
            {
              createCategoryList(category.categories).map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </select>

          {
            productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
          }
          <input type="file" name="productPicture" onChange={handleProductPictures} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )

}

export default Products