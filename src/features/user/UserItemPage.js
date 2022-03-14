import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Stack } from 'react-bootstrap'
import { CountDownTimer } from '../../components/CountDownTimer'
import { GetItemById, BidOnItem, AutoBidToogle, getBotByUserId, updateBot } from '../../services/itemService'
import { useAuth } from '../../Contexts/AuthContext'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import swal from 'sweetalert'

export default function UserItemPage(props) {

    const navigate = useNavigate();

    const [Item, setItem] = useState({})
    const [checkBox, setCheckBox] = useState(false)

    const { id: itemId } = useParams();
    const { credentials, setPageTitle } = useAuth();
    const bidAmountRef = useRef();

    const handleBidNow = async () => {

        // if (checkBox == true) {
        //     await AutoBidToogle(Item._id, checkBox, credentials).then(
        //         (res) => {
        //             swal("Autobidder is On", { icon: "success" })
        //             navigate('/items')

        //         },
        //         (rej) => {
        //             swal("cannot Perform Bid", { icon: "error" })
        //         }
        //     )
        //     return;
        // }
        // turn off autobidder for this item
        // await AutoBidToogle(Item._id, checkBox, credentials)

        const newBidAmount = bidAmountRef?.current?.value

        // --- checks before bid---

        if (new Date().toUTCString() > new Date(Item.auctoniEndsAt).toUTCString()) return swal("cannot Perform Bid", "Time already elapsed", { icon: "error" })

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

    useEffect(async () => {

        setPageTitle('Item')

        if (itemId) {
            await GetItemById(itemId, { userId: credentials.userId, role: credentials.role }).then(
                (res) => {
                    const { __v, ...itemObj } = res;
                    setItem(itemObj)
                },
                (rej) => console.log(rej)
            );
            // await getBotByUserId(credentials).then(
            //     res => {
            //         const status = res.ItemIdsForAutoBid.findIndex((id) => id == itemId)
            //         if (status !== -1) {
            //             setCheckBox(prev => true)
            //         } else {
            //             setCheckBox(prev => false)
            //         }
            //         // const status = Object.values(res.ItemIdsForAutoBid).map(function (key) { return res.ItemIdsForAutoBid[key]; })
            //         // console.log(status);
            //     }
            // );
        }
    }, [])
    return (
        <>
            <div className='my-4 col-sm-10 mx-auto'>
                <Card>
                    <Card.Body>
                        <Card.Title className='align-items-baseline mb-3 me-auto'>
                            <Stack direction='horizontal' gap={2}>

                                <h5 className='display-6 me-auto'>{Item?.name}</h5>
                                <CountDownTimer EndTime={Item.auctoniEndsAt} />

                            </Stack>

                        </Card.Title>

                        <div>Bid price :<strong> {
                            Item?.currentBid?.price > Item?.basePrice ? Item?.currentBid?.price : Item?.basePrice
                        } </strong> </div>

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
                </Card>
            </div>
        </>
    )
}
