import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import Link from 'next/link';
// import { Breadcrumbs, useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Breadcrumbs } from 'nextjs-breadcrumbs';

const useStyles = makeStyles({
    container: {
        margin: '20px 0',
        padding: '0 5%',
        transition: 'ease-in-out .3s',
        alignItems: 'center',
        '& ol': {
            listStyle: 'none',
            '& li': {
                display: 'inline-block',
                textAlign: 'left',
                '&::after': {
                    content: '"/"',
                    padding: '0 6px'
                },
                '& a': {
                    color: Theme.TFontHeadColor,
                    textDecoration: 'none',
                    transition: 'ease-in-out .3s',
                    fontSize: 12,
                    textTransform: 'capitalize !important',
                    '&:hover': {
                        color: Theme.secondary,
                    }
                },
                '&:last-child': {
                    '& a': {
                        fontWeight: 600,
                    },
                    '&::after': {
                        content: '""',
                    },
                }
            }
        },
    },

})

export interface UrlObject {
    endPoint: string,
    name: string,
}


function CustomBreadCrumb() {

    // const { breadcrumbs } = props;

    // const isMobile = useMediaQuery('(max-width:769px)');
    // const isTablet = useMediaQuery('(max-width:992px)');

    const makeCrumbList = (crumbs: UrlObject[]) => {
        return [{ name: 'home', endPoint: '/' }, ...crumbs]
    }

    // const [breadcrumbs, setBreadCrumbs] = React.useState<UrlObject[]>(makeCrumbList(props.breadcrumbs));

    const styles = useStyles();

    const crumbs = Breadcrumbs();

    // return crumbs;


    return (
        // <div style={{ backgroundColor: '#888' }}>

        <div className={'container'}>
            <div className={styles.container}>
                <Breadcrumbs maxItems={4}  >
                    {crumbs}
                </Breadcrumbs>
            </div>
        </div>
        // </div>
    )


}

export default CustomBreadCrumb;







// --------   code to get endpoint text    ------\\

// let urlString = router.asPath;
//         const pathList = urlString.split('/');
//         if (pathList[1] === '') {
//             pathList.pop();
//         }
//         let crumbs = pathList.map((path: string) => {
//             return { name: path ? path.split('#')[0] : 'home', endPoint: '' }
//         });
//         setBreadCrumbs(crumbs);