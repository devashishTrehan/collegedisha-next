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

// export interface InstituteInformation {
//     about: string,
//     address_detail: {
//         timings: string,
//         contact_no?: string,
//         address: string,
//     }
// }

// export interface InstituteGallery {
//     images: string[],
//     videos: string[],
// }

// export interface InstituteFaculty {
//     id,
//     name: string,
//     designation: string,
//     mailId: string,
//     mobileNo: string,
//     image: string,
// }

// export interface Institutefaculties {
//     facultyList: InstituteFaculty[],
// }


// export interface InstituteHostelFees {
//     room: string,
//     AC: string,
//     Non_AC: string,
// }
// export type InstituteHostelFacility = 'wifi' | 'gym' | 'power_supply' | 'canteen' | 'auditorium' | 'library' | 'laboratory' | 'medical' | 'sports' | 'computer_lab' | null;

// export interface InstituteHostelDetails {
//     fees: InstituteHostelFees[],
//     facilities: InstituteHostelFacility[],
//     hostel_content: string,
// }

// export interface InstituteHostel {
//     female: InstituteHostelDetails | null,
//     male: InstituteHostelDetails | null,
//     gender?: 'male' | 'female' | 'common'
// }

// export interface InstituteCourses {
//     courseList: CourseListItem,
//     course_content: string
// }

export interface detailedBoard {
    id: number,
    name: string,
    image: string,
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

