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
                        <Stack direction='vertical' gap={1}>
                            <span className='h4 me-auto'>{name}</span>
                            <CountDownTimer EndTime={auctionEndsAt} />
                        </Stack>
                    </Card.Title>
                    <Stack direction='vertical' gap={1}>
                        <div className='span text-muted'>Bid price : {Math.max(basePrice, 0)}</div>
                        <div className='span text-muted'>{description}</div>

                        {(new Date().getTime() < new Date(auctionEndsAt).getTime()) &&
                            <div className='ms-auto'>
                                <Link to={`/items/${_id}`}>
                                    <Button variant='primary'>Bid Now</Button>
                                </Link>
                            </div>}
                    </Stack>
                </Card.Body>
            </Card>
        </div >
    )
}
