import React from 'react'
import { Card } from 'react-bootstrap'

export default function ItemCard({ name, description, amount, bidEndsAt }) {
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title className='justify-content-between align-items-baseline mb-3'>
                        <a className='span'>{name || ''}</a>
                    </Card.Title>
                    <div>{description || ''}</div>
                    <div>{bidEndsAt || '00:00'}</div>
                    <div>Bid price : {amount || 0}</div>
                </Card.Body>
            </Card>
        </div>
    )
}
