export interface IFeedArticles {
    author: {
        bio: any
        following: boolean
        image: string
        username: string
    };
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
}

export interface IFeedData {
    articles: IFeedArticles[];
    articlesCount: number;
}

export interface IFeedActionsTypes {
    apiUrl: string;
}