import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Stack, Table } from 'react-bootstrap'
import { CountDownTimer } from '../../components/CountDownTimer'
import { GetItemById, BidOnItem, getBidsByItemId } from '../../services/itemService'
import io from 'socket.io-client'

import { useAuth } from '../../Contexts/AuthContext'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import swal from 'sweetalert'

export default function UserItemPage(props) {

    const navigate = useNavigate();

    const [Item, setItem] = useState({})
    const [Bids, setBids] = useState([])
    const [CurrentBid, setCurrentBid] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [checkBox, setCheckBox] = useState(false)

    const [socket, setSocket] = useState(() => {
        return io.connect('http://localhost:3001/');
    });

    const { id: itemId } = useParams();

    const { credentials, setPageTitle } = useAuth();

    const bidAmountRef = useRef();

    const handleBidNow = async () => {

        const newBidAmount = bidAmountRef?.current?.value

        // --- checks before bid---

        if (new Date().getTime() > new Date(Item.auctoniEndsAt).getTime()) return swal("cannot Perform Bid", "Time already elapsed", { icon: "error" })

        if (newBidAmount <= Item?.basePrice || newBidAmount <= 0) return swal("cannot Perform Bid", "Please bid with higher amount", { icon: "error" })

        // ---bidding---
        await BidOnItem(itemId, newBidAmount, credentials).then(
            (res) => {
                swal("Bid performed successfully", { icon: "success" })
                navigate('/items')
            },
            (rej) => {
                swal("cannot Perform Bid", {
                    icon: "error",

                })
            }
        )
    }

    const fethItem = async () => {

        if (itemId) {
            const result = await GetItemById(itemId, { userId: credentials.userId, role: credentials.role }).then(
                (res) => res,
                (rej) => { }
            )
            if (result) {
                setItem(result)
                await fetchBids(result);
            }
        }
        return;
    }

    const fetchBids = async (item) => {

        const bids = await getBidsByItemId(itemId, { userId: credentials.userId, role: credentials.role }).then(
            (res) => res,
            (rej) => []
        )
        const current = bids.filter(bid => String(bid._id) === String(item.currentBid))

        setBids(prev => bids)

        if (current.length) setCurrentBid(prev => current[0])


        return;
    }



    useEffect(async () => {

        if (!itemId) navigate('*')

        setPageTitle('Item')

        setIsLoading(true);
        await fethItem()
        setIsLoading(false);
    }, [])

    const updateData = async () => {
        await fethItem(itemId)
    }

    useEffect(() => {

        socket.emit("startLiveUpdates", itemId);
        socket.on("updatedData", updateData);
        return () => {
            socket.emit("StopLiveUpdates", itemId);
            socket.off("updatedData", updateData);
        };
    }, [])


    return (
        <>

            <div className='my-4 col-sm-10 mx-auto'>

                {isLoading &&
                    <div className="d-flex justify-content-center my-4">
                        <div className="spinner-border text-primary"
                            style={{ width: "3rem", height: "3rem" }}
                            role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }

                {!isLoading && <Card>
                    <Card.Body>

                        <Card.Title className='align-items-baseline mb-3 me-auto'>
                            <Stack direction='horizontal' gap={2}>
                                <h5 className='display-6 me-auto'>{Item?.name}</h5>

                                {Item?._id && <CountDownTimer EndTime={Item.auctionEndsAt} />
                                }
                            </Stack>
                        </Card.Title>

                        <div>Bid price :<strong> {CurrentBid.bidPrice || Item.basePrice} </strong> </div>

                        <div>{Item?.description}</div>

                        <Stack direction='horizontal' gap={1} className="mt-4">
                            <Link
                                to={{
                                    pathname: `/items`
                                }}
                            >
                                <Button variant='secondary'>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </Button>
                            </Link>
                            <input
                                type='checkbox'
                                className='form-check-input ms-auto'
                                value={checkBox}
                                checked={checkBox}
                                onChange={e => setCheckBox(e.target.checked)} />
                            <label className=''>Auto bidder</label>

                            <div className='col-3'>
                                <input
                                    type="number"
                                    className="form-control"
                                    ref={bidAmountRef}
                                    readOnly={checkBox}
                                    placeholder='Your bid'
                                    min={0} />
                            </div>
                            <Button onClick={handleBidNow}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </Button>

                        </Stack>
                    </Card.Body>
                </Card>}


                {!isLoading && <Card>
                    <Card.Body>
                        <Card.Title className='align-items-baseline mb-3 me-auto'>
                            <h6 className='text-center'>Bids</h6>
                        </Card.Title>

                        {/*  */}
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Bid</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Bids?.map((bid, index) => {
                                    // if (String(bid._id) === String(Item.currentBid)) return;
                                    return (
                                        <tr key={bid._id} className={bid.userId == credentials.userId ? 'table-primary' : ''}>
                                            <td>{bid.userId}</td>
                                            <td>{bid.bidPrice}</td>
                                            <td>{new Date(bid.createdAt).toLocaleString()}</td>
                                        </tr>
                                    )


                                })}

                            </tbody>
                        </Table>
                        {/*  */}

                    </Card.Body>
                </Card>}


            </div>
        </>
    )
}
