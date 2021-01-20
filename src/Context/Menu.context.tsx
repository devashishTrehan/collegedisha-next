import { Routes } from '@/Services/App.service';
import * as React from 'react';
import { MenuListInterface } from '../Services/Interfaces.interface';


export const MenuContext = React.createContext<any>({});

function MenuContextProvider(props: any) {


    const [MenuList, setMenuList] = React.useState([
        {
            label: 'College By Stream',
            list: [
                {
                    label: 'Engineering', list: [
                        { label: 'B.Tech' },
                        { label: 'M.Tech' },
                        { label: 'BCA' },
                        { label: 'B.E' },
                        { label: 'M.E' },
                    ]
                },
                {
                    label: 'Management', list: [
                        { label: 'B.B.A' },
                        { label: 'M.B.A' },
                        { label: 'PGDMA' },
                    ]
                },
                {
                    label: 'Medical', list: [
                        { label: 'MBBS' },
                    ]
                },
                {
                    label: 'Commerce', list: []
                },
                {
                    label: 'Arts', list: []
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
                { label: 'News', link: Routes.News, list: [] },
                { label: 'Exams', link: Routes.Exams, list: [] },
                { label: 'Coaching', link: Routes.Coachings, list: [] },
                { label: 'Career Options', link: '', list: [] },
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