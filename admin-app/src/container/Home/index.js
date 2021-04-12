import React from 'react';
import Layout from '../../components/Layout';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import './style.css';
import { NavLink } from 'react-router-dom';

/**
* @author
* @function Signin
**/

const Home = (props) => {

  return(
    <Layout sidebar>
    

        {/* <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center">
            <h1>Welcome to Dashboard</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor metus efficitur consequat cursus. Nullam ac mi volutpat, hendrerit libero nec, placerat mi. Vestibulum sit amet molestie enim. Etiam auctor velit vitae ex pharetra, ut semper ante mattis. Fusce laoreet nibh dui, at suscipit leo sollicitudin ut. </p>
        </Jumbotron> */}
    </Layout>
   )

 }

export default Home