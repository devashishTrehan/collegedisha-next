export interface ExamListItemLink {
    label: string,
    url: string
}

export interface ExamCategoryType {
    label: string,
    url: string,
    image?: string
}

export interface ExamListItem {
    id: number,
    title: string,
    image: string,
    slug: string,
    subTitle: string,
    links: ExamListItemLink[]
}

export interface ExamList {
    exams: ExamListItem[]
}

export interface detailedExam {
    id: number,
    name: string,
    views?: number,
    slug: string,
    examSections: { [key: string]: string },
    initialSection: {
        title: string,
        content: string
    }
}