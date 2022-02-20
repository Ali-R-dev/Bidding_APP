import React from 'react'
import { Button, Card, Stack } from 'react-bootstrap'

export default function UserItemPage() {
    return (
        <>
            <div className='my-4 col-sm-8 m-auto'>
                <h5 className='text-center'>Product Detail Page</h5>
                <Card>
                    <Card.Body>
                        <Card.Title className='align-items-baseline mb-3 me-auto'>
                            <h5 className='span me-auto'>{"Product name"}</h5>
                        </Card.Title>
                        <div>{"product description"}</div>
                        <div>{'00:00'}</div>
                        <div>Bid price : {0}</div>
                        <Stack direction='horizontal' gap={2}>

                            <input type='checkbox' className='form-check-input ms-auto' />
                            <label className='me-4'>Auto bidder</label>
                            <div className='col-sm-3'>
                                <input type="number" className="form-control" placeholder='Your bid' min={0} />
                            </div>

                            <Button>Bid Now</Button>


                        </Stack>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
