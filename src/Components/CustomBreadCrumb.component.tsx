import { makeStyles } from '@material-ui/styles';
import { Theme as MuiTheme } from '@material-ui/core';
import * as React from 'react';
import { Theme } from '../Services/App.service';
import { Breadcrumbs } from 'nextjs-breadcrumbs';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: MuiTheme) => ({
    container: {
        margin: '20px 0',
        padding: '0 5%',
        transition: 'ease-in-out .3s',
        alignItems: 'center',
        '& ol': {
            listStyle: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            '& li': {
                display: 'inline-block',
                textAlign: 'left',
                '&::after': {
                    content: '"/"',
                    fontSize: 10,
                    color: Theme.TFontHeadColor,
                    padding: '0 6px'
                },
                '& a': {
                    color: Theme.TFontHeadColor,
                    textDecoration: 'none',
                    transition: 'ease-in-out .3s',
                    fontSize: 10,
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

}))

export interface UrlObject {
    endPoint: string,
    name: string,
}


function CustomBreadCrumb() {

    const [render, setRender] = React.useState(true);

    const makeCrumbList = (crumbs: UrlObject[]) => {
        return [{ name: 'home', endPoint: '/' }, ...crumbs]
    }
    const router = useRouter();

    const styles = useStyles();

    const crumbs = Breadcrumbs();


    React.useEffect(() => {

        let path = router.asPath;
        console.log('path', path)
        if (path === '/') {
            setRender(false);
        } else {
            setRender(true);
        }
        let crumbContainer = document.getElementById('__crumbsContainer');
        if(crumbContainer){
            // let crumbs = crumbContainer()
        }

    }, [router.asPath])


    return (
        <div id={'__crumbsContainer'}>
            {

                render ?

                    <div className={'container'}>
                        <div className={styles.container} >
                            {crumbs}
                        </div>
                    </div>
                    : null
            }
        </div>
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