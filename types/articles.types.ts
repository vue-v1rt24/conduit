export type TagListType = string | string[]

export interface IArticlesFormTypes {
    title: string;
    description: string;
    body: string;
    tagList: TagListType;
}