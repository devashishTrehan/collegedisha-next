export interface CareerListItem {
    id: number,
    name: string,
    image: string,
    courses: { name: string, slug: string }[],
    slug: string
}

export interface CareerList {
    exams: CareerListItem[]
}

export interface detailedCareer extends CareerListItem {
    careerSections: { [key: string]: string },
    sectionContent: {
        [key: string]: {
            title: string,
            content: string
        }
    }
}
