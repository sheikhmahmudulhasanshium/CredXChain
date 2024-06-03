"use client"
import  { useEffect } from 'react';

const RootPage = () => {
    useEffect(() => {
        window.location.href = '/home';
    }, []);

    return null;
}

export default RootPage;
