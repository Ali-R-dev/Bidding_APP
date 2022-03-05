import React from 'react'
import { Card, Button, Stack } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { CountDownTimer } from './CountDownTimer'

export default function ItemCard({ _id, name, description, basePrice, auctionEndsAt, currentBid }) {
    return (
        <div>
            <Card className='m-2'>
                <Card.Body>
                    <Card.Title className='justify-content-between align-items-baseline mb-3'>
                        <Stack direction='horizontal'>
                            <span className='h4 me-auto'>{name}</span>
                            <CountDownTimer EndTime={auctionEndsAt} />
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
