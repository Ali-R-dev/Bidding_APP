import React, { useState, useEffect } from 'react'
import { Card, Form, Stack, Button, Radio } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import swal from 'sweetalert'
export default function Profile() {



    const { setAuth, isAuth, credentials, setPageTitle } = useAuth();
    const [user, setUser] = useState([])

    return (
        <>
            <div className='col-sm-6 m-auto mt-5'>
                <Card>
                    <Card.Body>
                        <Card.Title className='align-items-baseline me-auto'>
                            <h5 className='text-center'>User Profile</h5>
                        </Card.Title>
                        <div>
                            <h1>User Id : {credentials.userId}</h1>
                            <h1>User Name : {credentials.userName}</h1>
                            <h1>User Role : {credentials.role}</h1>
                        </div>

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
