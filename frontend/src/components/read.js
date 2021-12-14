import {useReducer, useEffect } from 'react';
import {Table, Button, Input, Image, Icon} from 'semantic-ui-react';
import {post} from 'axios';
import {sortBy} from 'lodash'
import {Link} from 'react-router-dom';
import './read.css';

export default function Read() {
    const [state, dispatch] = useReducer(sorterReducer, {
        column: null,
        data: [],
        direction: null,
        loading: true
    });

    const graphQlEndpoint = 'http://localhost:8080/graphql';

    const requestProductData = (query) => {
        query = query.replace(/"/g, "\\\"") || "";
        post(graphQlEndpoint, {
            query: `query {
                        search(query:"${query}") { code position quantity image price description }
                    }`
            },
            { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                dispatch({ type: 'dataLoaded', payload: response.data.data.search })
            });
    };

    const searchOnDb = (e) => { requestProductData(e.target.value); };

    const deleteProduct = (id) => {
        id = id.replace(/"/g, "\\\"") || "";
        post(graphQlEndpoint, {
            query: `mutation {
                        deleteProduct(code:"${id}") { code }
                    }`
            },
            { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                requestProductData("");
            });
    };

    useEffect(() => {
        requestProductData("");
    }, []);

    function sorterReducer(state, action) {
        switch (action.type) {
            case 'sort':
                if (state.column === action.column) {
                    return {
                        ...state,
                        data: state.data.slice().reverse(),
                        direction: state.direction === 'ascending' ? 'descending' : 'ascending',
                    }
                }
                return {
                    column: action.column,
                    data: sortBy(state.data, [action.column]),
                    direction: 'ascending',
                }
            case 'dataLoaded':  
                return {  
                    loading: false,  
                    data: action.payload
                }
            default:
                throw new Error()
        }
    }
    const { column, data, direction } = state;


    return (
        <div class="read-container">
            <h1 className="main-header">Product list</h1>
            <Input icon='search' placeholder='Search...' onChange={searchOnDb} /> 
            <div class="add-button-container"><Link to='/create'><Button icon labelPosition='left' primary ><Icon name='add circle' />Add new product</Button></Link></div>
            <div class="table-container">
                <Table sortable fixed padded='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'code' ? direction : null}
                                onClick={() => dispatch({ type: 'sort', column: 'code' })}>Code</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'description' ? direction : null}
                                onClick={() => dispatch({ type: 'sort', column: 'description' })}>Description</Table.HeaderCell>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'position' ? direction : null}
                                onClick={() => dispatch({ type: 'sort', column: 'position' })}>Position</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'quantity' ? direction : null}
                                onClick={() => dispatch({ type: 'sort', column: 'quantity' })}>Quantity</Table.HeaderCell>
                            
                            <Table.HeaderCell
                                sorted={column === 'price' ? direction : null}
                                onClick={() => dispatch({ type: 'sort', column: 'price' })}>Price</Table.HeaderCell>
                            <Table.HeaderCell>Update</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map(({code, position, quantity, image, price, description}) => {
                            return (
                                <Table.Row key={code}>
                                    <Table.Cell>{code}</Table.Cell>
                                    <Table.Cell>{description}</Table.Cell>
                                    <Table.Cell><Image src={image} fluid /></Table.Cell>
                                    <Table.Cell>{position}</Table.Cell>
                                    <Table.Cell>{quantity}</Table.Cell>
                                    <Table.Cell>${price}</Table.Cell>
                                    
                                    <Table.Cell> 
                                        <Link to={`/update/${code}`}><Button compact color='yellow'>Update</Button></Link>
                                    </Table.Cell>
                                    <Table.Cell> 
                                        <Button negative compact onClick={() => deleteProduct(code)}>Delete</Button>
                                    </Table.Cell>
                                </Table.Row>
                        )})}
                    </Table.Body>
                </Table>
                    </div>
                <div>
                <Link to='/create'><Button floated='right' icon labelPosition='left' primary ><Icon name='add circle' />Add new product</Button></Link>
                
            </div>
        </div>
    )
}