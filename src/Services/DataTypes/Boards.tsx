export interface classTypes {
    name: string,
    slug: string
}
export interface BoardListItemTypes {
    id: number,
    name: string,
    image: string,
    classes: classTypes[],
}

export interface BoardListTypes {
    BoardList: BoardListItemTypes[]
}


export interface detailedBoard {
    id: number,
    name: string,
    banner: string,
    rating: number,
    isApplied: boolean,
    isSaved: boolean,
    views?: number,
    boardSections: { [key: string]: string },
    initialSection: {
        title: string,
        content: string
    }
}

