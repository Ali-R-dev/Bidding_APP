import React, { useState, useEffect } from 'react'
import { Card, Form, Stack, Button, Radio } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../../Contexts/AuthContext'
import swal from 'sweetalert'


export default function LoginPage() {


    // --- for using while dev---
    // const admins = [
    //     { id: "adm1", role: "admin" },
    //     { id: "adm2", role: "admin" }
    // ]
    // const regulars = [
    //     { id: "usr1", role: "regular" },
    //     { id: "usr2", role: "regular" },
    //     { id: "usr3", role: "regular" }
    // ]


    const { setAuth, isAuth, credentials, setPageTitle } = useAuth();
    const [user, setUser] = useState({ userId: '', role: '' })

    useEffect(() => {
        setPageTitle('')
        // socket.on('message', (msg) => {
        //     console.log(msg)
        // })
    }, [])

    if (isAuth()) {
        if (credentials.role === "ADM") return (<Navigate to="/dashboard" />)
        return (<Navigate to="/items" />)
    }

    const handleSetUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await setAuth(user)
        if (res === undefined) swal("unauthorized")
    }



    // const testSubmit1 = (Id, Role) => {
    //     setUser({ id: Id, role: Role })

    // }
    // const testSubmit2 = async () => {
    //     await setAuth(user)
    // }

    return (
        <>
            <div className='col-sm-6 m-auto mt-5'>
                <Card>
                    <Card.Body>
                        <Card.Title className='align-items-baseline me-auto'>
                            <h5 className='text-center'>LOG IN</h5>
                        </Card.Title>
                        <Form className='row' onSubmit={handleSubmit}>


                            <Form.Group className="sm-4 m-auto" controlId="frmId">
                                <Form.Label>ID : </Form.Label>

                                <Form.Control required type="password" name='userId' onChange={handleSetUser} placeholder="User ID" />
                            </Form.Group>

                            <Form.Group className="sm-4 m-auto mt-2" >
                                <span>Role : </span>
                                <Stack direction='horizontal' gap={4} className=''>
                                    <div>
                                        <Form.Check
                                            inline
                                            id="admin"
                                            value="ADM"
                                            onChange={handleSetUser}
                                            type='radio'
                                            name="role" />
                                        <Form.Check.Label
                                            htmlFor="admin">
                                            {'Admin'}
                                        </Form.Check.Label>
                                    </div>
                                    <div>
                                        <Form.Check
                                            required
                                            inline
                                            id="regular"
                                            value="REG"
                                            onChange={handleSetUser}
                                            type='radio'
                                            name="role" />
                                        <Form.Check.Label
                                            htmlFor="regular">
                                            {'Regular'}
                                        </Form.Check.Label>
                                    </div>
                                </Stack>
                            </Form.Group>
                            <div className='text-center m-2'>
                                <Button className='' type='submit'>Log in</Button>
                            </div>
                        </Form>

                    </Card.Body>
                </Card>
            </div>


            {/* ---for using while dev--- */}
            {/* <div>
                <h1>Admins</h1>
                {admins.map((admin) => {
                    const { id, role } = admin
                    return (
                        <div key={id} className="m-2">
                            <Button
                                onClick={async () => {
                                    await testSubmit1(id, role)
                                    await testSubmit2()
                                }}>
                                {id}</Button>
                        </div>
                    )
                })}

                <h1>Regulars</h1>

                {regulars.map((reg) => {
                    const { id, role } = reg
                    return (
                        <div key={id} className="m-2">
                            <Button
                                onClick={async () => {
                                    await testSubmit1(id, role)
                                    await testSubmit2()
                                }}
                            >{id}</Button>
                        </div>
                    )
                })}
            </div> */}
        </>
    )
}
