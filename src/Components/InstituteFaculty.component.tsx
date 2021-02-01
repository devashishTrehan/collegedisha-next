import { Theme } from '@/Services/App.service';
import React, { useEffect, useState } from 'react';
import { Grid, IconButton, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import classNames from 'classnames';
import { InstituteFaculty } from '@/Services/DataTypes/Institutes';
import { EmailOutlined, PhoneOutlined } from '@material-ui/icons';
import DummyCards from './DummyCard.component';



const useStyles = makeStyles({


})

const useCardStyles = makeStyles({
    container: {
        width: 280,
        border: '1px solid #ccc',
        borderRadius: Theme.radius2,
        padding: 20,
        textTransform: 'capitalize',
        height: '100%',
        transition: '0.3s',
        margin: 'auto',
        '& .name': {
            fontFamily: 'gorditaMedium',
            color: Theme.primary,
            marginTop: 10,
        },
        '& .designation': {
            color: '#666',
            marginTop: 10,
        },
        '& .buttonsWrap': {
            marginTop: 20,
            '& .button': {
                margin: '0 3px ',
                padding: 8,
                '& svg': {
                    fontSize: 18,
                },
            },
        },
        '& .imageWrap': {
            width: 80,
            height: 80,
            overflow: 'hidden',
            borderRadius: '50%',
            margin: 'auto',
            '& img': {
                width: '100%',
            },
            marginBottom: 20,
        },
        '&:hover': {
            boxShadow: Theme.boxShadow,
            borderColor: 'transparent',
        }
    },
    container_M: {
        width: '100%',
        '& .imageWrap': {
            width: 60,
            height: 60,
        },
    }
})

interface CardProps {
    faculty: InstituteFaculty,
}

interface Props {
    data: InstituteFaculty[],
}

const defaultImage = '/assets/images/defaults/user.png';

const FacultyCard = ({ faculty }: CardProps) => {

    const { id, image, name, designation, mailId, mobileNo } = faculty;

    const isMobile = useMediaQuery('(max-width:769px)');
    const styles = useCardStyles();

    return (
        <div key={id} className={classNames(styles.container, { [styles.container_M]: isMobile })} >
            <div className='imageWrap'>
                <img src={image ? image : defaultImage} alt='' />
            </div>
            <Typography className='name'>{name}</Typography>
            <Typography className='designation'>{designation}</Typography>
            <div className='buttonsWrap'>
                <a href={`mailto:${mailId}`}><IconButton className='button'><EmailOutlined /></IconButton></a>
                <a href={`tel:${mobileNo}`}><IconButton className='button'><PhoneOutlined /></IconButton></a>
            </div>
        </div>
    )
}

export function RenderFaculty(props: Props) {

    const [data, setData] = useState<InstituteFaculty[]>(props?.data)
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const styles = useStyles();

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
        <div className={'pageSectionContainer'} >
            <div className={'containerHead'}>
                <Typography variant='h4'>Our Faculties</Typography>
            </div>
            <Grid container spacing={5} justify={isMobile ? 'center' : 'space-around'}>
                {
                    data?.map((faculty: InstituteFaculty, index: number) => {
                        return <Grid item key={index} xs={12} sm={6}>
                            <FacultyCard faculty={faculty} />
                        </Grid>
                    })
                }
                {
                    !isMobile &&
                    <DummyCards cardCount={data?.length} spacing={5} withGrid={true} cardSize={{ width: { small: 200, regular: 280 } }} />
                }
            </Grid>
        </div>
    );
}