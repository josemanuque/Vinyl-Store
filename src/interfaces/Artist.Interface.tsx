import { VinylInterface } from "./Vinyl.Interface";

export interface ArtistInterface{
    id?: string;
    name: string;
    biography?: string;
    imageURL?: string;
    vinyls: VinylInterface[];
}

export interface ArtistInputInterface{
    name: string;
    biography?: string;
    imageURL?: string;
}