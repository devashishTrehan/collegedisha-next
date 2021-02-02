import InstituteDetailComponent from '@/Components/InstituteDetail.component';
import { GetInstituteDetails } from '@/Services/Api.service';
import { Storages } from '@/Services/App.service';
import React from 'react';

const getData = async (params) => {

    return await GetInstituteDetails(params);
}

function InstituteDetails(props) {


    return (
        <>
            <InstituteDetailComponent {...props} />
        </>
    );
}

export default InstituteDetails;

export async function getServerSideProps(context) {

    let cookies = context.req.cookies;
    let token = cookies[Storages.AccessToken]
    let userId = parseInt(cookies[Storages.UserId])
    let slug = context.params.instituteSlug[0];
    let returnData = { props: { data: null } }
    let section = context.params.instituteSlug[1];
    let response = await getData({ token: token, userId: userId, slug: slug, section: section ? section : 'information' });
    if (response) {
        returnData.props.data = response.data;
    }
    return returnData;

}