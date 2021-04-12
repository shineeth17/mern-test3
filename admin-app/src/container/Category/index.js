import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';

/**
* @author
* @function Category
**/

const Category = (props) => {
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCateoryId] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    

    const handleClose = () => {
        const form = new FormData();
        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        dispatch(addCategory(form));
        setShow(false);
    }
    
    const handleShow = () => setShow(true);


    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>
                        {renderCategories(category.children)}
                    </ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ 
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)} />

                    <select className="form-control" 
                    value={parentCategoryId}
                    onChange={(e) => setParentCateoryId(e.target.value)} >
                        <option> select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
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

export default Category