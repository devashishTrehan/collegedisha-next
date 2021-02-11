export interface CareerListItem {
    id: number,
    name: string,
    thumbnail: string,
    courses: { name: string, slug: string }[],
    slug: string
}

export interface CareerList {
    exams: CareerListItem[]
}

export interface detailedCareer {
    id: number,
    name: string,
    courses: { name: string, slug: string }[],
    slug: string
    careerSections: { [key: string]: string },
    sectionContent: {
        [key: string]: {
            title: string,
            content: string
        }
    }
}
