import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useNumber = () => {
    const [number, setNumber] = useState(0)
    useEffect(()=>{
        axios.get('/get')
        .then(res=>{
            setNumber(res.data);
        })
    },[])
    return number;
};

export default useNumber;