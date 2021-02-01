import { } from '@apollo/client';
import { CourseListItem } from './Courses';

export interface boardTypes {
    name: string,
    classes: string[]
}
export interface BoardListItemTypes {
    id: number,
    name: string,
    image: string,
    slug: string,
    boards: boardTypes[],
}

export interface BoardListTypes {
    BoardList: BoardListItemTypes[]
}


export interface detailedBoard {
    id: number,
    name: string,
    thumbnail: string,
    rating: number,
    isApplied: boolean,
    isSaved: boolean,
    slug: string,
    views?: number,
    boardSections: { [key: string]: string },
    initialSection: {
        title: string,
        content: string
    }
}

