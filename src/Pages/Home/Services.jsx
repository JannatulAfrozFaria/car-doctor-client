// import React, { useEffect, useState } from 'react';
import useServices from '../../Hooks/useServices';
import ServiceCard from './ServiceCard';


//DRY ----Do not repeat yourself
const Services = () => {
    // const [services,setServices] = useState([]);
    // useEffect(()=>{
    //     fetch('https://car-doctor-server-dun-tau.vercel.app/services')
    //     .then(res=>res.json())
    //     .then (data=>setServices(data))
    // },[])
    const services = useServices();
    return (
        <div className='text-center mt-6'>
             <h1 className="text-3xl font-bold text-red-600">Service</h1>
                    <p className="text-5xl font-bold">Our Service Area</p>
                    <p className="py-6 w-1/2 mx-auto">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.  </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6'>
                        {services.map(service=> <ServiceCard key={service._id} service={service} ></ServiceCard> )}
                    </div>
        </div>
    );
};

export default Services;