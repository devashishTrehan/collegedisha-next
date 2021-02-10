// ----- Institute course types from here ----- \\
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

export interface CourseList {
    exams: CourseListItem[]
}


export interface detailedCourse extends CourseListItem {
}
// ----- Institute course types to here ----- \\



// ----- App level course types from here ----- \\
export interface G_CourseItemType {
    id: number,
    label: string,
    slug: string,
}

export interface G_CourseCategory {
    id: number,
    title: string,
    logo?: string,
    slug: string,
    courseList: G_CourseItemType[]
}

export interface G_CourseDetailType {
    id: number,
    title: string,
    views: number,
    banner?: string,
    content: string,
    slug: string,
    commentCount: number,
    voteCount: number,
    publishedOn: string,
    readTime: string,

}
// ----- Institute course types to here ----- \\
