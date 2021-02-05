
export interface NewsListItemTypes {
    id: number,
    title: string,
    image: string,
    slug: string,
    author: string,
    isSaved: boolean,
    publishedOn: string,
    views: number,
    commentCount: number,
    category: string
}

export interface NewsListTypes {
    newsList: NewsListItemTypes[],
    featuredNews: NewsListItemTypes[],
    newsCategories: { [key: string]: string },
}


export interface detailedNews extends NewsListItemTypes {
    intro: string,
    content: string
}

