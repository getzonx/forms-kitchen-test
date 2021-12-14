import React, { useState } from 'react';
import { Button, Form, Image } from 'semantic-ui-react';
import {post} from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Create() {
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [position, setPosition] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const graphQlEndpoint = 'http://localhost:8080/graphql';

    const postData = () => {
        post(graphQlEndpoint, {
            query: `mutation createProduct($input: ProductInput!) {
                createProduct(input: $input) {
                    code
                    position
                    quantity
                    image
                    price
                    description
              }
            }`,
            variables: {
                input: {
                    code: code.replace(/"/g, "\"\""),
                    position: parseInt(position),
                    quantity: parseInt(quantity),
                    image: image.replace(/"/g, "\"\""),
                    price: parseFloat(price),
                    description: description.replace(/"/g, "\"\"")
                }}
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            }).then(res => {
                setCode("");
                setPosition("");
                setQuantity("");
                setImage("");
                setPrice("");
                setDescription("");

                navigate('/');
            });
    };
    
    return(
        <div class="read-container">
            <h1 className="main-header">Add new product</h1>
            <Form className="create-form" onSubmit={postData} >
                <Form.Field>
                    <Form.Input required fluid label='Code' placeholder='HWR16-03' onChange={(e) => setCode(e.target.value)} value={code} type='text' />
                </Form.Field>
                <Form.Field>
                    <Form.Input required fluid label='Position' placeholder='#' onChange={(e) => setPosition(e.target.value)} value={position} type='number' /> 
                </Form.Field>
                <Form.Field>
                    <Form.Input required fluid label='Quantity' placeholder='#' onChange={(e) => setQuantity(e.target.value)} value={quantity} type='number' /> 
                </Form.Field>
                <Form.Field>
                    <Form.Input required fluid label='Image' placeholder='Image URL' onChange={(e) => setImage(e.target.value)} value={image} type='url' /> 
                    <Image src={image} size='tiny'/>
                </Form.Field>
                <Form.Field>
                    <Form.Input required fluid label='Price' placeholder='0.00' onChange={(e) => setPrice(e.target.value)} value={price} type='number' /> 
                </Form.Field>
                <Form.Field>
                    <Form.TextArea required label='Description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
                </Form.Field>
                <Button primary type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
