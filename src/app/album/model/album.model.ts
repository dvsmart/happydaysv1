export class Album{
    id:number;
    name:string;
    caption:string;
    isPublic:boolean;
    imagesCount?:number;
    coverImage?:string;
    addedOn?:Date;
    updated?:Date
    createdBy:string;
    like:string | "favorite_border";
}