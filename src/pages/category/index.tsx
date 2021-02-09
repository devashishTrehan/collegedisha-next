import { Routes, Theme } from '@/Services/App.service';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Category(props) {

    const router = useRouter();

    useEffect(() => {
        router.replace(Routes.Exams);
    }, [])

    return (
        <div className='container'>
            <div className='wrapper'>

                <Typography variant='h1' style={{ color: Theme.primary, fontSize: 30 }}>Page is under development</Typography>
            </div>
        </div>
    );
}

export default Category;