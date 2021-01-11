import { } from '@apollo/client';

export interface InstituteListItem {
    id: number,
    name: string,
    image: string,
    rating: number,
    location: string,
    isApplied: boolean,
    isSaved: boolean
}

export interface InstituteList {
    institutes: InstituteListItem[]
}

export interface detailedInstitute extends InstituteListItem {
    views: number
}