import React from 'react'
import { Card, Button, Stack } from 'react-bootstrap'
import { Link } from "react-router-dom";
export default function ItemCard({ _id, name, description, basePrice, auctionEndsAt, currentBid }) {
    return (
        <div>
            <Card className='m-2'>
                <Card.Body>
                    <Card.Title className='justify-content-between align-items-baseline mb-3'>
                        <Stack direction='horizontal'>
                            <span className='display-6 me-auto'>{name}</span>
                            <div className='span text-muted'>{new Date(auctionEndsAt).toLocaleString() || '00:00'}</div>
                        </Stack>
                    </Card.Title>
                    <div className='span text-muted'>Bid price : {Math.max(basePrice, currentBid?.price)}</div>
                    <div className='span text-muted'>{description}</div>
                    <div className='my-2'>
                        <Link to={`/items/${_id}`}>
                            <Button variant='primary'>Bid Now</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div >
    )
}
