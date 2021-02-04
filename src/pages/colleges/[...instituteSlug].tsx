import InstituteDetailComponent from '@/Components/InstituteDetail.component';
import { GetInstituteDetails, GetInstituteList } from '@/Services/Api.service';
import { Storages } from '@/Services/App.service';
import { pageSections } from '@/Components/InstituteDetail.component';
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


// export async function getServerSideProps(context) {

//     let cookies = context.req.cookies;
//     let token = cookies[Storages.AccessToken]
//     let userId = parseInt(cookies[Storages.UserId])
//     let slug = context.params.instituteSlug[0];
//     let returnData = { props: { data: null } }
//     let section = context.params.instituteSlug[1];
//     let response = await getData({ token: token, userId: userId, slug: slug, section: section ? section : 'information' });
//     if (response) {
//         returnData.props.data = response.data;
//     }
//     return returnData;

// }



export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await GetInstituteList({ category: 'college', size: 10000, pageNo: 1, userId: null, token: '' })
    let institutes = [];
    if (res) {
        institutes = res?.data?.result;
    }

    let sections = Object.keys(pageSections);
    // Get the paths we want to pre-render based on posts
    let paths = [];
    institutes.map((ins) => {
        sections.map((section) => {
            paths.push({
                params: { instituteSlug: [ins.slug, pageSections[section]] },
            })
        })
    })

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
}


export async function getStaticProps({ params }) {

    let returnData = { props: { data: null }, revalidate: 1 }
    let response = await getData({ slug: params?.instituteSlug[0], section: params?.instituteSlug[1] });
    if (response) {
        returnData.props.data = response.data;
    }
    return returnData;

}

