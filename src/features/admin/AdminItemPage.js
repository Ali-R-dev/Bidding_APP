import React from 'react'
import { Form, Button, te, Stack } from 'react-bootstrap'

export default function AdminItemPage() {
    return (

        <div className='col-sm-8 m-auto'>
            <Form>

                <Form.Group className="mb-3" controlId="frmName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="enter name" />
                </Form.Group>
                <div className='row'>

                    <Form.Group className="mb-3 col-sm-6" controlId="frmBasePrice">
                        <Form.Label>Base Price</Form.Label>
                        <Form.Control type='number' min="0" />
                    </Form.Group>

                    <Form.Group className="mb-3 col-sm-6" controlId="formExpiryTime">
                        <Form.Label>Bid Expiry Time</Form.Label>
                        <Form.Control type="datetime-local" />
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="frmDesc">
                    <Form.Label>Description</Form.Label>

                    <Form.Control as="textarea" rows={3} />


                </Form.Group>
                {/* <Stack variant="horizontal" gap={2}> */}
                <div className='row'>

                    <Button variant="primary" className='col-sm-2 m-2'>
                        Save
                    </Button>

                    <Button variant="secondary" className='col-sm-2 m-2'>
                        Cancel
                    </Button>
                </div>


                {/* </Stack> */}
            </Form>
        </div >
    )
}
