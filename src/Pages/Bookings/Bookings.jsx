import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import BookingRow from './BookingRow';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Bookings = () => {
    const {user} =  useContext(AuthContext);
    const [bookings,setBookings] = useState([]);

    const axiosSecure = useAxiosSecure();

    //FOR APPROACH----1 &  2----------
    // const url = `https://car-doctor-server-dun-tau.vercel.app/bookings?email=${user?.email}`;

    //FOR APPROACH-----3---------------
    const url = `/bookings?email=${user?.email}`;
    useEffect(()=>{
        //APPROACH------1
        // fetch(url,{credentials: 'include'})
        // .then(res=> res.json())
        // .then(data=> setBookings(data))

        //APPROACH-------2
        // axios.get(url,{withCredentials:true} )
        // .then(res=>{
        //     setBookings(res.data);
        // })

        //APPROACH------3
        axiosSecure.get(url)
        .then(res=>setBookings(res.data))
    },[url,axiosSecure]);
    const handleDelete =  id =>{
        const proceed = confirm('Are You sure you wnat to delete?');
        if(proceed){
            fetch(`https://car-doctor-server-dun-tau.vercel.app/bookings/${id}`,{
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert('deleted successfully');
                    const remaining = bookings.filter(booking=> booking._id !==id);
                    setBookings(remaining);
                }
            })
        }
    }
    const handleBookingConfirm =  id =>{
        const proceed = confirm('Are You sure you wnat to confirm?');
        if(proceed){
            fetch(`https://car-doctor-server-dun-tau.vercel.app/bookings/${id}`,{
                method: 'PATCH',
                headers:{
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({status: 'confirm'})
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.modifiedCount>0){
                    alert('modified successfully');
                    //update state
                    const remaining = bookings.filter(booking=> booking._id !==id);
                    const updated = bookings.find(booking=>booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
        }
    }
    
    return (
        <div>
            <h2 className="text-5xl">Your Bookings: {bookings.length} </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                        </th>
                        <th>Image</th>
                        <th>Service</th>
                        <th>Email</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking=>  <BookingRow key={booking._id} booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm= {handleBookingConfirm} ></BookingRow> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;