import React from 'react'
import { Form, Button } from 'react-bootstrap'

export default function AdminItemPage() {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="enter name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter description here" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formExpiryTime">
                    <Form.Label>Bid Expiry Time</Form.Label>
                    <Form.Control type="datetime" />
                </Form.Group>

                <Button variant="primary">
                    Save
                </Button>
                <Button variant="secondary">
                    Cancel
                </Button>
                <Button variant="danger">
                    Delete
                </Button>

            </Form>
        </div>
    )
}
