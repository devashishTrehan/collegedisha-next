import InstituteDetailComponent from '@/Components/InstituteDetail.component';
import { Routes } from '@/Services/App.service';
import React from 'react';

function InstituteDetails(props) {

    const breadCrumbs = [{ name: 'Institutes', endPoint: `${Routes.Institutes}` }];


    return (
        <InstituteDetailComponent breadcrumbs={breadCrumbs} />
    );
}

export default InstituteDetails;