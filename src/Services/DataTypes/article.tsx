import { } from '@apollo/client';
import { CourseListItem } from './Courses';

// export interface boardTypes {
//     name: string,
//     classes: string[]
// }
export interface ArticleListItemTypes {
    id: number,
    title: string,
    thumbnail: string,
    slug: string,
    author: string,
    isSaved: boolean,
    banner: string,
    voteCount: number,
    publishedOn: string,
    views: number,
    readTime: string,
    commentCount: number,
}

export interface FeaturedArticlesTypes {
    main: ArticleListItemTypes,
    side: ArticleListItemTypes[],
    bottom: ArticleListItemTypes[],
}

export interface ArticleListTypes {
    articleList: ArticleListItemTypes[],
    trendingArticles: ArticleListItemTypes[],
    featuredArticles: FeaturedArticlesTypes
}


export interface detailedArticle extends ArticleListItemTypes {
    content: string,
}

