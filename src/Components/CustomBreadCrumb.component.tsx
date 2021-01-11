import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '../Services/App.service';
import Link from 'next/link';
import { Breadcrumbs, useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    container: {
        margin: '15px 0',
        padding: '0 5%',
        transition: 'ease-in-out .3s',
        alignItems: 'center',
        '& li': {
            color: Theme.TFontHeadColor,
        }
    },
    link: {
        color: Theme.TFontHeadColor,
        textDecoration: 'none',
        transition: 'ease-in-out .3s',
        fontSize: 12,
        textTransform: 'capitalize',
        '&:hover': {
            color: Theme.secondary,
        }
    },
    activeLink: {
        fontWeight: 600,
    }

})

export interface UrlObject {
    endPoint: string,
    name: string,
}

interface Props {
    breadcrumbs: UrlObject[]
}

function CustomBreadCrumb(props: Props) {

    // const { breadcrumbs } = props;

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    const makeCrumbList = (crumbs: UrlObject[]) => {
        return [{ name: 'home', endPoint: '/' }, ...crumbs]
    }

    const [breadcrumbs, setBreadCrumbs] = React.useState<UrlObject[]>(makeCrumbList(props.breadcrumbs));

    const styles = useStyles();

    React.useEffect(() => {
        setBreadCrumbs(makeCrumbList(props.breadcrumbs));
    }, [props.breadcrumbs])


    console.log('breadcrumbs', breadcrumbs);

    if (breadcrumbs.length > 1) {
        return (
            // <div style={{ backgroundColor: '#888' }}>

            <div className={'container'}>
                <div className={styles.container}>
                    <Breadcrumbs maxItems={3}  >
                        {breadcrumbs.map((breadcrumb: UrlObject, index: number) => {
                            return (
                                <Link key={index} href={breadcrumb.endPoint} >
                                    <a className={classNames(styles.link, { [styles.activeLink]: index === breadcrumbs?.length - 1 })} >
                                        <span >{breadcrumb.name}</span>
                                    </a>
                                </Link>
                            )
                        })}
                    </Breadcrumbs>
                </div>
            </div>
            // </div>
        )
    } else {
        return null;
    }

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