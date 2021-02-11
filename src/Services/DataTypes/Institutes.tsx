import { CourseListItem } from './Courses';

export interface InstituteListItem {
    id: number,
    name: string,
    thumbnail: string,
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
    addressDetails: {
        timings: string,
        contactNumber?: string,
        address: string,
    }
}


export interface InstituteGalleryImage {
    id: number,
    image: string,
    imageName: string
}
export interface InstituteGallery {
    images: InstituteGalleryImage[],
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
    NonAC: string,
}
export type InstituteHostelFacility = 'wifi' | 'gym' | 'power_supply' | 'canteen' | 'auditorium' | 'library' | 'laboratory' | 'medical' | 'sports' | 'computer_lab' | null;

export interface InstituteHostelDetails {
    fees: InstituteHostelFees[],
    facilities: InstituteHostelFacility[],
    hostelContent: string,
}

export interface InstituteHostel {
    female: InstituteHostelDetails | null,
    male: InstituteHostelDetails | null,
    gender?: 'male' | 'female' | 'common'
}

export interface InstituteCourses {
    courseList: CourseListItem[],
    courseContent: string
}

export interface InstituteAdmission {
    content: string
}

export interface detailedInstitute extends InstituteListItem {
    views: number,
    banner: string,
    information?: InstituteInformation,
    courses?: InstituteCourses,
    admission?: { content: string },
    review?: any,
    gallery?: InstituteGallery,
    faculty?: InstituteFaculty[],
    hostel?: InstituteHostel
}

