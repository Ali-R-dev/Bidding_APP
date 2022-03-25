import React, { useState, useEffect, useRef } from 'react'
import { Card, Form, Stack, Button, Table } from 'react-bootstrap'
import { Navigate, useHref } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { getUserHistory, getBotByUserId, updateBot, getInvoice } from '../../services/itemService'
import swal from 'sweetalert'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

export default function Profile() {

    const { isAuth, credentials, setPageTitle } = useAuth();
    const InvRef = useRef();
    const [itemHistory, setItemHistory] = useState([])
    const [bot, SetBot] = useState({
        maxBalance: '', notifyAt: ''

    })

    const fetchData = async () => {
        await getUserHistory(credentials).then(
            res => setItemHistory(res),
            rej => console.log(rej)
        )
        await getBotByUserId(credentials).then(
            res => SetBot({ maxBalance: res.maxBalance, notifyAt: res.notifyAt }),
            rej => console.log(rej)
        )
    }
    const fetchInvoicePdf = async (itemId) => {
        const inv = await getInvoice(itemId, credentials)

        // ---Enable it to view in new window---
        // let pdfWindow = window.open("")
        // pdfWindow.document.write(
        //     "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        //     encodeURI(inv.base64String) + "'></iframe>"
        // )

        // ---enable it to direct download---
        const linkSource = `data:application/pdf;base64,${inv.base64String}`
        InvRef.current.href = linkSource

        InvRef.current.download = `${inv.invoiceCode}.pdf`
        InvRef.current.target = "_blank"
        InvRef.current.click();
        // window.open("data:application/pdf," + encodeURI(inv.base64String));

    }
    const setValue = (e) => {
        SetBot({ ...bot, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(bot);
        await updateBot(bot, credentials).then(
            res => swal("Success", "updated successfully", { icon: "success" }),
            rej => console.log(rej)
        )
    }

    const getStatus = (item) => {
        if (item.isSoled && String(item.currentBid.userId) == String(credentials.id)) return <td className='text-success fw-bold'>{'WON'}</td>
        if (item.isSoled && String(item.currentBid.userId) != String(credentials.id)) return <td className='text-danger fw-bold'>{'LOST'}</td>
        if (!item.isSoled && String(item.currentBid.userId) == String(credentials.id)) return <td className='text-primary fw-bold'>{'IN PROGRESS...You bid is highest'}</td>
        if (!item.isSoled && String(item.currentBid.userId) != String(credentials.id)) return <td className='text-alert fw-bold'>{'IN PROGRESS...other user has higher bid'}</td>
        // return <td className='text-secondary fw-bold'>{'IN PROGRESS...'}</td>
    }


    useEffect(() => {
        if (credentials.role === 'REG')
            fetchData()
    }, [])
    return (
        <>
            <a ref={InvRef} style={{ visibility: "hidden" }}>invoice</a>
            <Card className='col-sm m-auto mt-5'>
                <Card.Body>
                    <Card.Title className='align-items-baseline me-auto'>
                        <h5 className='text-center'>User Profile</h5>
                    </Card.Title>
                    <div>
                        <h6>User Id : <span className='text-muted'>{credentials.userId}</span></h6>
                        <h6>User Name : <span className='text-muted'>{credentials.userName}</span></h6>
                        <h6>User Role : <span className='text-muted'>{credentials.role}</span></h6>
                        <h6>User Email : <span className='text-muted'>{credentials.email || "N/A"}</span></h6>
                    </div>
                </Card.Body>
            </Card>
            {credentials.role == 'REG' &&

                <>
                    <Card className='mt-2'>
                        <Card.Body>
                            <Card.Title className='align-items-baseline me-auto'>
                                <h5 className='text-center'>bot configuration</h5>
                            </Card.Title>

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3 align-items-baseline m-auto">
                                    <div className="col">

                                        <label htmlFor="max">Max Balance</label>
                                        <input
                                            className="form-control"
                                            required
                                            value={bot.maxBalance}
                                            onChange={(e) => setValue(e)}
                                            type="number"
                                            name='maxBalance'
                                            placeholder="Max balance"
                                            min={'0.0'}
                                            step={'0.1'} />

                                    </div>
                                    <div className="col">

                                        <label htmlFor="notify">Notify At</label>
                                        <input
                                            className="form-control"
                                            required
                                            value={bot.notifyAt}
                                            onChange={(e) => setValue(e)}
                                            type="number"
                                            name='notifyAt'
                                            placeholder="Notify At"
                                            min={'0'}
                                            max={'100'}
                                            step={'0.1'} />

                                    </div>
                                    <div className="col mt-auto">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>

                            </form>

                        </Card.Body>
                    </Card>

                    <div className='row m-auto'>
                        <Card className='col-sm-4'>
                            <Card.Body>
                                <Card.Title>
                                    <h5 className='text-center'>Awards</h5>
                                </Card.Title>
                                <div>
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Item</th>
                                                <th>Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {itemHistory.filter(x => String(x.currentBid.userId) == String(credentials.id)).map((itm, i) => {
                                                return <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{itm.name}</td>
                                                    <td>
                                                        <Button
                                                            variant='outline-primary'
                                                            onClick={() => fetchInvoicePdf(itm._id)}
                                                        >
                                                            <FontAwesomeIcon icon={faFilePdf} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            })}


                                        </tbody>
                                    </Table>
                                </div>

                            </Card.Body>
                        </Card>

                        <Card className='col-sm-8'>
                            <Card.Body>
                                <Card.Title>
                                    <h5 className='text-center'>Your Biddings</h5>
                                </Card.Title>
                                <div>
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>History</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemHistory?.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    {getStatus(item)}

                                                    <tr>
                                                        {item?.bids?.map((b, i) => {
                                                            return <tr key={i}>
                                                                <td><strong>{b.bidPrice}</strong>-</td>
                                                                <td>{new Date(b.createdAt).toLocaleString()}</td>
                                                            </tr>
                                                        })
                                                        }
                                                    </tr>

                                                </tr>
                                            })}

                                        </tbody>
                                    </Table>
                                </div>

                            </Card.Body>
                        </Card>

                    </div>
                </>
            }
        </>
    )
}