import { } from '@apollo/client';
import { CourseListItem } from './Courses';

export interface InstituteListItem {
    id: number,
    name: string,
    image: string,
    rating: number,
    location: string,
    isApplied: boolean,
    isSaved: boolean,
    slug: string
}

export interface InstituteList {
    institutes: InstituteListItem[]
}

export interface InstituteInformation {
    about: string,
    address_detail: {
        timings: string,
        contact_no?: string,
        address: string,
    }
}

export interface InstituteGallery {
    images: string[],
    videos: string[],
}

export interface InstituteFaculty {
    id,
    name: string,
    designation: string,
    mailId: string,
    mobileNo: string,
    image: string,
}

export interface Institutefaculties {
    facultyList: InstituteFaculty[],
}


export interface InstituteHostelFees {
    room: string,
    AC: string,
    Non_AC: string,
}
export type InstituteHostelFacility = 'wifi' | 'gym' | 'power_supply' | 'canteen' | 'auditorium' | 'library' | 'laboratory' | 'medical' | 'sports' | 'computer_lab' | null;

export interface InstituteHostelDetails {
    fees: InstituteHostelFees[],
    facilities: InstituteHostelFacility[],
    hostel_content: string,
}

export interface InstituteHostel {
    female: InstituteHostelDetails | null,
    male: InstituteHostelDetails | null,
    gender?: 'male' | 'female' | 'common'
}

export interface InstituteCourses {
    courseList: CourseListItem,
    course_content: string
}

export interface detailedInstitute extends InstituteListItem {
    views: number,
}

