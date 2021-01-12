import { } from '@apollo/client';

export interface CourseFees {
    currency: string,
    frequency: string,
    amount: number
}

export interface CourseListItem {
    id: number,
    name: string,
    totalFees: CourseFees,
    type: 'full-time' | 'part-time',
    duration: string,
    streams: string[],
    feesBreakdown: CourseFees[]
}

export interface ExamList {
    exams: CourseListItem[]
}

export interface detailedExam extends CourseListItem {
}
