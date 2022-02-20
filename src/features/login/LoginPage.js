import React from 'react'
import { Card, Form, Stack, Button } from 'react-bootstrap'
export default function LoginPage() {
    return (
        <>
            <div className='my-4 col-sm-8 m-auto'>
                <Card>
                    <Card.Body>
                        <Card.Title className='align-items-baseline mb-3 me-auto'>
                            <h5 className='text-center'>LOG IN</h5>
                        </Card.Title>
                        <Form className='row'>

                            <Form.Group className="mb-3" controlId="frmUserName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="User name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="frmPass">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                <div className='span text-center text-muted'><a href='#'>Forgotton Password</a></div>
                            </Form.Group>
                        </Form>
                        <Stack direction='horizontal' gap={2}>

                            <div className="form-check ms-auto">
                                <input className="form-check-input" type="checkbox" id="flexCheck" />
                                <label className="form-check-label" for="flexCheck">
                                    keep sign in
                                </label>
                            </div>
                            <Button className='me-auto'>Log in</Button>
                        </Stack>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
