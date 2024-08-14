export interface SpotifyAlbumInterface {
    id: string;
    name: string;
    releaseDate: string;
    external_urls: {
        spotify: string;
    };
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    tracks: {
        items: SpotifyTrackInterface[];
    };
}

export interface SpotifyAlbumSearchResult {
    id: string;
    name: string;
    release_date: string;
    external_urls: {
        spotify: string;
    };
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    artists: Array<{
        name: string;
    }>;
}


export interface SpotifyAlbumSearchResultProps {
    onSelect: (album: SpotifyAlbumSearchResult) => void;
    albums: SpotifyAlbumSearchResult[];
}

export interface SpotifyTrackInterface {
    id: string;
    name: string;
    duration_ms: number;
    external_urls: {
        spotify: string;
    };
    preview_url: string;
    track_number: number;
}

export interface SpotifyLoadFormProps {
    onSelect: (album: SpotifyAlbumSearchResult) => void;
    setArtistId: (artistId: string) => void;
}