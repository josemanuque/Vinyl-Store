import { ArtistInterface } from "./Artist.Interface";
import { TrackInterface } from "./Track.Interface";

export interface VinylInterface{
    id: string;
    title: string;
    artist: ArtistInterface | string;
    coverImage?: string;
    price: number;
}

export interface VinylInputInterface{
    title: string;
    artistId: ArtistInterface | string;
    coverImage?: string;
    price: number;
    releaseDate?: string;
    description?: string;
}



export interface VinylProps{
    id: string;
    title: string;
    artist: ArtistInterface | string;
    coverImage?: string;
    price: number;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

export interface VinylListProps {
    vinyls: VinylInterface[];
    onDelete?: (id: string) => void;
}

export interface VinylResponseInterface{
    id: string;
    title: string;
    artist: ArtistInterface;
    coverImage?: string;
    price: number;
    releaseDate?: string;
    description?: string;
    tracks: TrackInterface[];
}