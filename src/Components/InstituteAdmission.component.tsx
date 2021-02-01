
import React, { useEffect, useState } from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import MarkdownParser from './MarkdownParser.component';
import { InstituteAdmission } from '@/Services/DataTypes/Institutes';


// ----- Admission section start ----- \\
const AdmissionStyles = makeStyles({

})

interface Props {
    data: InstituteAdmission
}

export function RenderAdmission(props: Props) {
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = AdmissionStyles();

    const [data, setData] = useState<InstituteAdmission>(props?.data);

    useEffect(() => {
        setData(props.data);
    }, [props?.data])

    const fetchData = async () => {
        console.log('fetching data');
    }

    useEffect(() => {
        if (data) {
            fetchData();
        }
    }, [])
    
    return (

        <div className={'pageSectionContainer'} style={isMobile ? { padding: '20px' } : null}>
            <MarkdownParser content={data?.content} />
        </div>
    );
}
// ----- Admission section End ----- \\
