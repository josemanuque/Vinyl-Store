export interface TrackInterface{
    id: string;
    title: string;
    time: number;
    artistId?: string;
    albumId?: string;
    spotifyTrackId?: string;
    url?: string;
    previewUrl?: string;
    trackNumber?: number;
}

export interface TrackInputInterface{
    title: string;
    time: number;
    artistId?: string;
    albumId?: string;
    spotifyTrackId?: string;
    url?: string;
    previewUrl?: string;
    trackNumber?: number;
}

export interface TrackProps {
    track: TrackInterface;
    onClick?: () => void;
}

export interface TrackListProps {
    tracks: TrackInterface[];
    setTracks: (tracks: TrackInterface[]) => void;
    onAddTrack?: (id: string) => void;
}