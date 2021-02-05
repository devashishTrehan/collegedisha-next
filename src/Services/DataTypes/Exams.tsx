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

export interface detailedExam {
    id: number,
    name: string,
    slug: string,
    views?: number,
    examSections: { [key: string]: string },
    initialSection: {
        title: string,
        content: string
    }
}