export interface CoachingListItem {
    id: number,
    name: string,
    thumbnail: string,
    rating: number,
    location: string,
    isSaved: boolean,
    slug: string,
    description: string,
    categories: string[],
    tags: string[]
}



export interface detailedCoaching extends CoachingListItem {
    views: number,
    about: string,
    courseDetails: string,
    admission: string,
    addressDetails: {
        timings: string,
        contactNo?: string,
        address: string,
    }
    reviews?: object
}

