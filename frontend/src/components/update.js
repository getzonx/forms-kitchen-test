import React, {useState, useEffect } from 'react';
import {Form, Button, Image} from 'semantic-ui-react';
import {post} from 'axios';
import {useParams, useNavigate, } from 'react-router-dom';

export default function Update() {

    const navigate = useNavigate();
    const { code } = useParams();

    const graphQlEndpoint = 'http://localhost:8080/graphql';

    const [codeUpdate, setCodeUpdate] = useState('');
    const [positionUpdate, setPositionUpdate] = useState('');
    const [quantityUpdate, setQuantityUpdate] = useState('');
    const [imageUpdate, setImageUpdate] = useState('');
    const [priceUpdate, setPriceUpdate] = useState('');
    const [descriptionUpdate, setDescriptionUpdate] = useState('');

    const updateProduct = () => {
        post(graphQlEndpoint, {
            query: `mutation updateProduct($code: ID!, $input: ProductInput!) {
                updateProduct(code: $code, input: $input) {
                    code
              }
            }`,
            variables: {
                code: codeUpdate.replace(/"/g, "\"\""),
                input: {
                    code: codeUpdate.replace(/"/g, "\"\""),
                    position: parseInt(positionUpdate),
                    quantity: parseInt(quantityUpdate),
                    image: imageUpdate.replace(/"/g, "\"\""),
                    price: parseFloat(priceUpdate),
                    description: descriptionUpdate.replace(/"/g, "\"\"")
                }}
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            }).then(res => {
                setCodeUpdate("");
                setPositionUpdate("");
                setQuantityUpdate("");
                setImageUpdate("");
                setPriceUpdate("");
                setDescriptionUpdate("");

                navigate('/');
            });
    };

    useEffect(() => {
        const readProduct = () => {
            let codeParam = code.replace(/"/g, "\\\"") || "";
            post(graphQlEndpoint, {
            query: `query {
                        product(code:"${codeParam}") { code position quantity image price description }
                    }`
            },
            { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                setCodeUpdate(code);
                setPositionUpdate(response.data.data.product.position);
                setQuantityUpdate(response.data.data.product.quantity);
                setImageUpdate(response.data.data.product.image);
                setPriceUpdate(response.data.data.product.price);
                setDescriptionUpdate(response.data.data.product.description);
            });
        };
        readProduct();
    }, [code]);


    return (
        <div class="read-container">
            <h1 className="main-header">Update product "{code}"</h1>
                <Form className="create-form" onSubmit={updateProduct} >
                    <Form.Field>
                        <Form.Input fluid label='Code' placeholder='HWR16-03' value={codeUpdate} type='text' disabled required />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid label='Position' placeholder='#' onChange={(e) => setPositionUpdate(e.target.value)} value={positionUpdate} type='number' required  /> 
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid label='Quantity' placeholder='#' onChange={(e) => setQuantityUpdate(e.target.value)} value={quantityUpdate} type='number' required /> 
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid label='Image' placeholder='Image URL' onChange={(e) => setImageUpdate(e.target.value)} value={imageUpdate} type='url' required /> 
                        <Image src={imageUpdate} size='tiny'/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid label='Price' placeholder='0.00' onChange={(e) => setPriceUpdate(e.target.value)} value={priceUpdate} type='number' required /> 
                    </Form.Field>
                    <Form.Field>
                        <Form.TextArea label='Description' placeholder='Description' onChange={(e) => setDescriptionUpdate(e.target.value)} value={descriptionUpdate} />
                    </Form.Field>
                    <Button color='yellow' type='submit'>Update</Button>
                </Form>
            </div>
    )
}