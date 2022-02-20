import React from 'react'
import { Table, Button, Stack } from 'react-bootstrap'
export default function AdminDashboard() {
    var data = [
        { id: 1, name: "name1", desc: "desc1 zs,cjnakjn", price: 112 },
        { id: 2, name: "name2", desc: "desc2 akdndakjn zs,cjnakjn", price: 123 },
        { id: 3, name: "name3", desc: "desc3 akdndakjn zs,cjnakjn desc3 akdndakjn zs,cjnakjn desc3 akdndakjn zs,cjnakjn", price: 121 }
    ]
    return (
        <div>
            <h4 className=" h4 m-auto text-center">Admin Dashboard</h4>
            <div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Current Bid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return <tr key={item.id}>

                                <td>{index}</td>
                                <td>{item.name}</td>
                                <td>{item.desc}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Stack direction='horizontal' gap={2}>
                                        <Button>Detail</Button>
                                        <Button variant='danger'>Del</Button>
                                    </Stack>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </Table>
            </div>
        </div>
    )
}