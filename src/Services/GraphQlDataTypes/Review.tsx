import { } from '@apollo/client';

export interface ReviewRatingItems {
    accommodation: number,
    academic: number,
    faculty: number,
    placement: number,
    social: number,
    infrastructure: number,
}

export interface ReviewType {
    id: number,
    name: string,
    date: string,
    rating: number,
    review: string,
}

export interface ReviewList {
    reviews: ReviewType[],
    ratings: ReviewRatingItems,
}

