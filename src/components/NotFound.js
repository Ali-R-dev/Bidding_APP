import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <>
            <div className='text-center m-4'>
                <div className='display-1'>404</div>
                <div className='display-3'>Not Found</div>
            </div>
            <div className='text-center m-4'>
                <Link to={'/'}>
                    <button className='btn btn-primary'>Back to Home</button>
                </Link>
            </div>
        </>
    )
}
