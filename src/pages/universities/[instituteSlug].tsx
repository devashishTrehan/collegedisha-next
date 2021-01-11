import CustomBreadCrumb from '@/Components/CustomBreadCrumb.component';
import InstituteDetailComponent from '@/Components/InstituteDetail.component';
import { Routes } from '@/Services/App.service';
import { useRouter } from 'next/router';
import React from 'react';

function InstituteDetails(props) {

    const breadcrumbs = [{ name: 'universities', endPoint: `${Routes.Universities}` }];

    return (
        <>
            <InstituteDetailComponent  breadcrumbs={breadcrumbs} />
        </>
    );
}

export default InstituteDetails;