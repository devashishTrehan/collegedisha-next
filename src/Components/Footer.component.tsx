import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Email, FiberManualRecord, LocationOn, Phone, Smartphone } from '@material-ui/icons';
import { CSSProperties, getThemeProps, makeStyles } from '@material-ui/styles';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Routes, Theme, ContactInfo } from '../Services/App.service';
import classNames from 'classnames';
import { useMediaQuery } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles({
    fSection: {
        width: '100%',
        padding: '0 5%',
        backgroundColor: '#213858',
        backgroundImage: `url('/assets/images/footerBg.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
    },
    footer: {
        color: '#fff',
        padding: '20px 0',
        '& h6': {
            textAlign: 'left',
        },
        '& .footerHead': {
            padding: '0 10px 25px',
            marginBottom: 10,
            color: '#f1f1f1',
            display: 'inline-block',
            fontSize: 24,
            fontFamily: 'gorditaThin',
            '&::after': {
                display: 'block',
                content: '""',
                borderBottom: '2px solid #f1f1f1',
                width: '50%',
                margin: 'auto',
                marginTop: 5,
                bottom: -3,
            }
        },
        '& ul': {
            listStyle: 'none',
            textAlign: 'left',
            marginTop: 20,
            '& a': {
                color: '#ccc',
                textDecoration: 'none'
            }
        },
        '& li': {
            marginBottom: 10,
            cursor: 'pointer',
            fontSize: '14px',
            '&:last-child': {
                marginBottom: 0,
            },
            '& svg': {
                marginRight: 8,
                fontSize: 8
            },
        },
        '& li *': {
            transition: '.3s',
        },
        '& li:hover>a': {
            color: Theme.secondary,

        },
        '& .contact-list': {
            '& li': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            },
            '& svg': {
                height: '100%',
                fontSize: 15,
            },
        },
    },
    fAbout: {
        '& img': {
            display: 'block',
            marginTop: 8,
            width: 190
        },
        '& p': {
            fontSize: 14,
            margin: '10px 0',
            paddingRight: 20,
            textAlign: 'left',
            marginTop: 30,
        }
    },
    fAbout_M: {
        '& img': {
            width: 140
        },
    },
    fLink: {

    },
    fIndustries: {

    },
    fCities: {
        '& li': {
            width: '50%',
            textAlign: 'left',
            float: 'left',
        }
    },

    subscribeForm: {
        '& div': {
            height: 35,
            display: 'flex',
            width: '100%',
            maxWidth: 230,
            flexDirection: 'row',
        },
        '& input': {
            padding: 5,
            width: 'calc(100% - 35px)',
            borderRadius: 0,
            '&::placeholder': {
                fontSize: 14
            }
        },
        '& span': {
            height: '100%',
            width: 35,
            textAlign: 'center',
            lineHeight: '35px',
            fontSize: 14,
            backgroundColor: Theme.primary,
            color: '#fff',
            '&:hover': {
                color: Theme.secondary,
            },
        },
    }
})


const SMGroupStyles = makeStyles({

    smIconWrap: (props: SMGroupProps) => ({
        display: 'flex',
        flexDirection: 'row',
        margin: '20px -10px 0',
        justifyContent: 'flex-start',
        fontSize: 16,
        '& span': {
            width: 36,
            height: 36,
            padding: 5,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            transition: '.3s',
            '& svg': {
                color: props.color ? props.color : '#fff',
                fontSize: 20,
                transition: '.3s',
            },
            '&:hover': {
                // borderBottom: `2px solid ${Theme.secondary}`,
                '& svg': {
                    color: Theme.secondary,
                }
            }
        },

    })
})

interface SMGroupProps {
    color?: string,
    style?: CSSProperties
}

export const SocialMediaGroup = (props: SMGroupProps) => {

    const styles = SMGroupStyles({ color: props?.color });

    return (
        <div className={styles.smIconWrap} style={{ ...props.style }}>
            <span>
                <FontAwesomeIcon icon={faFacebookF} />
            </span>

            <span>
                <FontAwesomeIcon icon={faTwitter} />
            </span>

            <span>
                <FontAwesomeIcon icon={faLinkedinIn} />
            </span>

            <span>
                <FontAwesomeIcon icon={faInstagram} />
            </span>

            <span>
                <FontAwesomeIcon icon={faPinterestP} />
            </span>

            <span>
                <FontAwesomeIcon icon={faYoutube} />
            </span>
        </div>
    )
}



export const Footer = (props: any) => {

    const styles = useStyles();
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    React.useEffect(() => {

    }, [])

    const InternalLinks: any = [
        { label: 'About Us', link: Routes.About },
        { label: 'Contact US', link: Routes.Contact },
        { label: 'Terms & Conditions', link: Routes.TermsConditions },
        { label: 'Privacy policy', link: Routes.PrivacyPolicy },
        { label: 'FAQ', link: Routes.FAQ },
        { label: 'Promote With US', link: Routes.Advertisement },
        { label: 'Founder', link: Routes.Founder },
    ]
    const BestTags: any = ['College', 'Course', 'Career', 'Counsellor', 'Exams', 'Boards', 'Articles'];


    const renderLink = (label: string, link: string) => {
        return (<li key={label}
        // onClick={() => { window?.scroll(0, 0); }}
        ><Link href={link} >
                <a>
                    <FiberManualRecord />
                    {label}
                </a>
            </Link></li>)
    }



    return (

        <div className={styles.fSection} >
            <div className="container">
                <footer className={styles.footer}>
                    <Typography className={'footerHead'} variant='h5'>Direction for Your Career</Typography>
                    <Grid container spacing={4}>

                        <Grid item md={4} sm={6} xs={12} className={classNames(styles.fAbout, { [styles.fAbout_M]: isMobile })}>
                            <img src={'assets/images/FLogo.png'} alt='' />

                            <p>College Disha is the best informative education portal which is the ultimate destination for providing you substantial career options. Students can check top level colleges, courses, coaching, counsellors, trending articles and latest educational updates here to yield a significant aid to their career graph.
                                college disha footer cntnt for about us</p>

                            <SocialMediaGroup />

                        </Grid>

                        <Grid item md={2} sm={6} xs={6} className={styles.fLink}>
                            <Typography variant={'h6'}>Choose Best</Typography>
                            <ul>
                                {
                                    BestTags.map((link: any) => renderLink(link, ''))
                                }
                            </ul>
                        </Grid>

                        <Grid item md={2} sm={6} xs={6} className={styles.fLink}>
                            <Typography variant={'h6'}>Internal Links</Typography>
                            <ul>
                                {
                                    InternalLinks.map(({ link, label }: any) => renderLink(label, link))
                                }
                            </ul>
                        </Grid>

                        <Grid item md={4} sm={6} xs={12} className={styles.fLink}>
                            <Typography variant={'h6'}>Get In Touch</Typography>
                            <div>
                                <ul className={'contact-list'}>
                                    <li>
                                        <LocationOn />
                                        <span style={{ display: 'inline-block' }}>
                                            <span>{ContactInfo.address.sec1}</span>
                                            <br />
                                            <span>{ContactInfo.address.sec2}</span>
                                        </span>
                                    </li>
                                    <li>
                                        <Smartphone />
                                        <span><a href={`tel:${ContactInfo.mobile}`}>+91-{ContactInfo.mobile}</a></span>
                                    </li>
                                    <li>
                                        <Phone />
                                        <span><a href={`tel:${ContactInfo.phone}`}>{ContactInfo.phone}</a></span>
                                    </li>
                                    <li>
                                        <Email />
                                        <span><a href={`mailto:${ContactInfo.email}`}>{ContactInfo.email}</a></span>
                                    </li>
                                </ul>

                            </div>
                        </Grid>

                    </Grid>


                </footer >

            </div>
        </div >
    )

}