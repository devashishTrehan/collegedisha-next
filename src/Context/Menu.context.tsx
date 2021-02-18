import Routes from '@/Services/Routes';
import React from 'react';


export const MenuContext = React.createContext<any>({});

function MenuContextProvider(props: any) {


    const [MenuList, setMenuList] = React.useState([
        {
            label: 'College By Stream',
            list: [
                {
                    label: 'Engineering', list: [
                        { label: 'B.Tech', link: `${Routes.Institutes}/?courseName=B.Tech` },
                        { label: 'M.Tech' ,link: `${Routes.Institutes}/?courseName=M.Tech`},
                        { label: 'BCA',link: `${Routes.Institutes}/?courseName=BCA` },
                        { label: 'B.E',link: `${Routes.Institutes}/?courseName=B.E` },
                        { label: 'M.E' ,link: `${Routes.Institutes}/?courseName=M.E`},
                    ],link: `${Routes.Institutes}/?courseType=Engineering`
                },
                {
                    label: 'Management', list: [
                        { label: 'B.B.A' ,link: `${Routes.Institutes}/?courseName=B.B.A`},
                        { label: 'M.B.A' ,link: `${Routes.Institutes}/?courseName=M.B.A`},
                        { label: 'PGDMA' ,link: `${Routes.Institutes}/?courseName=PGDMA`},
                    ],link: `${Routes.Institutes}/?courseType=Management`
                },
                {
                    label: 'Medical', list: [
                        { label: 'MBBS' ,link: `${Routes.Institutes}/?courseName=MBBS`},
                    ],link: `${Routes.Institutes}/?courseType=Medical`
                },
                {
                    label: 'Commerce', list: [],link: `${Routes.Institutes}/?courseType=Commerce`
                },
                {
                    label: 'Arts', list: [],link: `${Routes.Institutes}/?courseType=Arts`
                },
            ]
        },

        {
            label: 'Counselling',
            list: [{
                label: 'Colleges', list: []
            },
            {
                label: 'Courses', list: []
            }, {
                label: 'Career', list: []
            },
            ]
        },
        {
            label: 'Study Material',
            list: [
                { label: 'Article', link: Routes.Articles, list: [] },
                { label: 'Universities', link: Routes.Universities, list: [] },
                { label: 'Top Courses', link: Routes.Courses, list: [] },
                { label: 'Colleges', link: Routes.Colleges, list: [] },
                { label: 'Boards', link: Routes.Boards, list: [] },
                { label: 'News', link: Routes.News, list: [] },
                { label: 'Exams', link: Routes.Exams, list: [] },
                { label: 'Coaching', link: Routes.Coachings, list: [] },
                { label: 'Career Options', link: Routes.CareerOptions, list: [] },
            ]
        },
    ])


    // React.useEffect(() => {

    // }, [RouteMatch.params])



    return (
        <MenuContext.Provider value={{
            MenuList: MenuList,
        }}>

            {
                props.children
            }

        </MenuContext.Provider>
    );

}

export default MenuContextProvider;