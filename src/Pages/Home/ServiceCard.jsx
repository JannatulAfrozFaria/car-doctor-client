import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {_id,title,img,price} = service;
    return (
        <div className="card card-compact  bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title} </h2>
                <p className='text-left text-red-600 text-xl'> Price: ${price} </p>
                <div className="card-actions">
                   <Link to={`/checkout/${_id}`} >
                        <button className="btn bg-red-600 text-white">Book Now</button>
                   </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;