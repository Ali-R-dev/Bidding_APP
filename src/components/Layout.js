import React from 'react'
import { Container } from 'react-bootstrap'

export default function Layout(props) {

    return (
        <>
            <Container className='my-4'>
                <nav className="navbar navbar-light bg-light text-center">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">BIDDING APP</a>
                    </div>
                </nav>
                {props.children}
            </Container>
        </>
    )
}
