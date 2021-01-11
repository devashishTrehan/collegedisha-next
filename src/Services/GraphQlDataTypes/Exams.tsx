import { } from '@apollo/client';

export interface ExamListItemLink {
    label: string,
    url: string
}

export interface ExamListItem {
    id: number,
    title: string,
    image: string,
    subTitle: string,
    links: ExamListItemLink[]
}

export interface ExamList {
    exams: ExamListItem[]
}

export interface detailedExam extends ExamListItem {

}