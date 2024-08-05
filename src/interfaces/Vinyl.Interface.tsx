import { ArtistInterface } from "./Artist.Interface";

export interface VinylInterface{
    _id?: string;
    title: string;
    artist: ArtistInterface | string;
    coverImage?: string;
    price: number;
}
