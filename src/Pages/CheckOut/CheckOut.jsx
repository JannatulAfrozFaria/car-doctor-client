import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const CheckOut = () => {
    const service = useLoaderData();
    const {title, _id, price,img} = service;
    const {user} = useContext(AuthContext)
    const handleBookService = (event) =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email;
        const date = form.date.value;
        const price = form.price.value;
        const booking = {
            customerName: name,
            email, 
            img,
            date, 
            price: price,
            service_id: _id,
            service: title
        }
        // console.log(booking);

        fetch('https://car-doctor-server-dun-tau.vercel.app/bookings',{
            method: 'POST',
            headers: {
               'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        }
        )
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId){
                alert('service book successfully!')
            }
        })
    }
    return (
        <div>
            <h2 className='text-center text-3xl'>Service: {title} </h2>
                <form onSubmit={handleBookService} className="card-body">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                                <input type="text"  name="name" defaultValue={user?.name} placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                                <input type="date"  name="date" placeholder="date" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                                <input type="text"  name="phone" placeholder="phone" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                                <input type="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Due amount</span>
                            </label>
                            <input type="text" name="price"  defaultValue={'$'+ price} placeholder="amount" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn bg-red-600 text-white" type="submit" value="Order Confirm" />
                        </div>
               </form>
        </div>
    );
};

export default CheckOut;