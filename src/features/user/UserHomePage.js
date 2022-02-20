import React from 'react'
import ItemCard from '../../components/ItemCard'
export default function UserHomePage() {
    const data = [
        {
            name: "name 1",
            description: "description 1",
            amount: 200,
            bidEndsAt: Date.now().toString()
        },
        {
            name: "name 2",
            description: "description 2",
            amount: 200,
            bidEndsAt: Date.now().toString()
        }, {
            name: "name 3",
            description: "description 3",
            amount: 300,
            bidEndsAt: Date.now().toString()
        },
        {
            name: "name 4",
            description: "description 4",
            amount: 400,
            bidEndsAt: Date.now().toString()
        },
        {
            name: "name 5",
            description: "description 5",
            amount: 500,
            bidEndsAt: Date.now().toString()
        }
    ]
    return (
        <div>
            <div className='h5 text-center m-3'>User home</div>

            <div className="form-group row m-4">
                <div className="col-xs-4">
                    <label>Search</label>
                    <input type='text' className="form-control" />
                </div>

            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: "1rem",
                alignItems: "flex-start"
            }}>
                {data.map((item, index) => {
                    return <ItemCard key={index} {...item} />
                })}
            </div>

        </div>
    )
}
