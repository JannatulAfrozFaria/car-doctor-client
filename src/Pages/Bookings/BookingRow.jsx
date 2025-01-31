import React from 'react';

const BookingRow = ({booking,handleDelete,handleBookingConfirm}) => {
    const {_id,customerName,email,date,service,price,img,status} = booking;

    //for easy STATE HANDLING-------
    // const handleDelete =  id =>{
    //     const proceed = confirm('Are You sure you wnat to delete?');
    //     if(proceed){
    //         fetch(`https://car-doctor-server-dun-tau.vercel.app/bookings/${id}`,{
    //             method: 'DELETE'
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             console.log(data);
    //             if(data.deletedCount>0){
    //                 alert('deleted successfully')
    //             }
    //         })
    //     }
    // }
    return (
        <tr>
                        <th>
                             <button onClick={()=> handleDelete(_id)} className="btn btn-sm btn-circle btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </th>
                        <td>
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    {/* {img && <img src={img} alt="Avatar Tailwind CSS Component" />} */}
                                    {img ?
                                        <img src={img} alt="Avatar Tailwind CSS Component" />
                                    :
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    }
                                </div>
                            </div>
                        </td>
                        <td> {service} </td>
                        <td>{email}</td>
                        <td>{price} </td>
                        <td> {date} </td>
                        <th>
                        {
                            status === 'confirm' ? <span className='font-bold text-green-600'>Confirmed</span>
                            : <button onClick={()=> handleBookingConfirm(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>
                        }
                        </th>
                    </tr>
    );
};

export default BookingRow;