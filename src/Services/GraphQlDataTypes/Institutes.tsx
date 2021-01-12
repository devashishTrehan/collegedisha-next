import { } from '@apollo/client';
import { CourseListItem } from './Courses';

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

export interface InstituteInformation {
    about: string,
    address: string
}

export interface InstituteGallery {
    images: string[],
    videos: string[],
}

export interface InstituteCourses {
    courseList: CourseListItem,
    course_content: string
}

export interface detailedInstitute extends InstituteListItem {
    views: number,
}

