import { FC, useState, FormEvent } from 'react';

interface SetTrackFormProps {
    onSubmit: (track: any) => void;
    initialValues?: TrackInput;
    onDelete?: (id: string) => void;
}

interface TrackInput {
    title: string;
    time: number;
    spotifyTrackId?: string;
    url?: string;
    previewUrl?: string;
    trackNumber?: number;
}

const TrackForm: FC<SetTrackFormProps> = ({ onSubmit, initialValues, onDelete }) => {
    const [id, setId] = useState<string>(initialValues?.id || '');
    const [title, setTitle] = useState<string>(initialValues?.title || '');
    const [time, setTime] = useState<number>(initialValues?.time || 0);
    const [spotifyTrackId, setSpotifyTrackId] = useState<string | undefined>(initialValues?.spotifyTrackId);
    const [url, setUrl] = useState<string | undefined>(initialValues?.url);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialValues?.previewUrl);
    const [trackNumber, setTrackNumber] = useState<number | undefined>(initialValues?.trackNumber);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            id,
            title,
            time,
            spotifyTrackId,
            url,
            previewUrl,
            trackNumber,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Set Track Details</h1>
            
            <div className='add-edit-vinyl-form-group'>
                <span>
                    <label htmlFor="track_title_modal">Title</label>
                </span>
                <input
                    type="text"
                    name="title"
                    id="track_title_modal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            
            <div className='add-edit-vinyl-form-group'>
                <span>
                    <label htmlFor="track_time_modal">Time (seconds)</label>
                </span>
                <input
                    type="number"
                    name="time"
                    id="track_time_modal"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                    required
                />
            </div>
            
            <div className='add-edit-vinyl-form-group'>
                <span>
                    <label htmlFor="track_spotify_modal">Spotify Track ID</label>
                </span>
                <input
                    type="text"
                    name="spotifyTrackId"
                    id="track_spotify_modal"
                    value={spotifyTrackId || ''}
                    onChange={(e) => setSpotifyTrackId(e.target.value)}
                />
            </div>
            
            <div className='add-edit-vinyl-form-group'>
                <span>
                    <label htmlFor="track_url_modal">URL</label>
                </span>
                <input
                    type="text"
                    name="url"
                    id="track_url_modal"
                    value={url || ''}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            
            <div className='add-edit-vinyl-form-group'>
                <span>
                    <label htmlFor="track_preview_modal">Preview URL</label>
                </span>
                <input
                    type="text"
                    name="previewUrl"
                    id="track_preview_modal"
                    value={previewUrl || ''}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                />
            </div>
            
            <div className='add-edit-vinyl-form-group'>
                <span>
                    <label htmlFor="track_number_modal">Track Number</label>
                </span>
                <input
                    type="number"
                    name="trackNumber"
                    id="track_number_modal"
                    value={trackNumber || 0}
                    onChange={(e) => setTrackNumber(Number(e.target.value))}
                />
            </div>
            <button onClick={() => onDelete!(id)} type="button">Delete Track</button>
            <button type="submit">Save Track</button>
        </form>
    );
};

export default TrackForm;
