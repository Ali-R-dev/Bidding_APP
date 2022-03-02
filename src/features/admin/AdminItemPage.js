import React, { useEffect } from 'react'
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GetItemById, CreateItem, UpdateItem } from '../../services/itemService'
import { useAuth } from '../../Contexts/AuthContext'
import { Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'

export default function AdminItemPage(props) {

    const navigate = useNavigate();

    const { id: itemId } = useParams();

    const { credentials, setPageTitle } = useAuth();

    const defaultValue = {
        currentBid: {
            price: 0,
            bidderId: ''
        },
        name: '',
        description: '',
        auctionEndsAt: new Date().toLocaleString(),
        basePrice: 0,
        adminId: credentials.id,
    }

    const { register, handleSubmit, trigger, reset,
        formState: { isDirty, errors } } = useForm({ defaultValues: defaultValue });

    const onSubmit = (itemObj) => {
        const Data = { ...itemObj, _id: "", adminId: credentials.id }
        console.log(Data);
        trigger().then(
            (res) => {

                itemId === undefined ? create(itemObj, credentials) : update(itemId, itemObj, credentials);

                navigate('/dashboard')
            },
            (rej) => console.log(rej)
        )

    }
    const create = (itemObj, credentials) => {
        CreateItem(itemObj, credentials).then(
            () => swal("Success", "Record Saved Successfully", { icon: "success" })
        )
    }
    const update = (itemId, itemObj, credentials) => {
        UpdateItem(itemId, itemObj, credentials).then(
            () => swal("Success", "Record updated Successfully", { icon: "success" })
        )

    }


    useEffect(async () => {
        setPageTitle('Item Detail')
        if (itemId) {
            await GetItemById(itemId, { id: credentials.id, role: credentials.role }).then(res => {
                const { __v, ...itemObj } = res;
                reset({ ...itemObj, auctionEndsAt: new Date(itemObj.auctionEndsAt).toLocaleString() });
            });
        }
    }, [])

    return (

        <div className='col-sm-8 mx-auto mt-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row row-sm">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label className="form-label">Name: <span className="text-danger">*</span></label>
                            <input
                                className={clsx("form-control", { "is-invalid state-invalid": errors?.name !== undefined })}
                                type="text"
                                name="name"
                                {...register("name",
                                    {
                                        required: "Field is Required",
                                        maxLength: { value: 10, message: "Maxium 10 charactors allowed" }
                                    })}
                                placeholder="Name"
                            />
                            <div className="invalid-feedback">{errors?.name?.message}</div>
                        </div>
                    </div>
                </div>

                <div className="row row-sm">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label className="form-label">Description: </label>
                            <textarea
                                className={clsx("form-control", { "is-invalid state-invalid": errors?.description !== undefined })}
                                type="text"
                                style={{ resize: 'none' }}
                                rows={3}
                                name="description"
                                {...register("description",
                                    {
                                        required: "Field is Required",
                                        maxLength: { value: 500, message: "Maxium 500 charactors allowed" }
                                    })}
                                placeholder="description"
                            />
                            <div className="invalid-feedback">{errors?.description?.message}</div>
                        </div>
                    </div>
                </div>

                <div className="row row-sm">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">base Price: <span className="text-danger">*</span></label>
                            <input
                                className={clsx("form-control", { "is-invalid state-invalid": errors?.basePrice !== undefined })}
                                type="number"
                                name="basePrice"
                                step="0.01"
                                {...register("basePrice",
                                    {
                                        required: "Field is Required",
                                        min: { value: 0, message: "value must be greater then 0" }
                                    })}
                                placeholder="base Price"
                            />
                            <div className="invalid-feedback">{errors?.basePrice?.message}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Auction Ends At: <span className="text-danger">*</span></label>
                            <input
                                className={clsx("form-control", { "is-invalid state-invalid": errors?.auctionEndsAt !== undefined })}
                                type="datetime"
                                name="auctionEndsAt"

                                {...register("auctionEndsAt",
                                    {

                                        valueAsDate: true,
                                        required: "Field is Required",
                                        min: { value: Date.now(), message: "must be a future value" }
                                    })}
                                placeholder="auction Ends At"
                            />

                            <div className="invalid-feedback">{errors?.auctionEndsAt?.message}</div>
                        </div>
                    </div>

                </div>
                <div className="row row-sm">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Current Bid</label>
                            <input
                                className="form-control"
                                type="text"
                                name="price"
                                readOnly
                                {...register("currentBid.price")}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label item-align-baseline">Current Bidder</label>
                            <input
                                className="form-control"
                                type="text"
                                name="bidderId"
                                readOnly
                                {...register("currentBid.bidderId")}

                            />
                        </div>
                    </div>
                </div>

                <Stack direction='horizontal' gap={1} className="m-4">
                    <Link
                        to={{
                            pathname: `/dashboard`
                        }}
                    >
                        <button className='btn btn-secondary'>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                    </Link>
                    <button className='btn btn-primary ms-auto' type='submit' disabled={!isDirty}>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                </Stack>
            </form>
        </div >
    )

}