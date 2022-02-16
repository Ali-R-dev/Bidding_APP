import React from 'react'
import { Container } from 'react-bootstrap'

export default function Layout(props) {
    return (
        <Container className='my-4'>
            <h1 className="m-auto text-center">Bidding App</h1>
            {props.children}
        </Container>
    )
}
