import { FC } from 'react';
import Track from '../Track/Track';
import { TrackListProps } from '../../interfaces/Track.Interface';

const TrackList: FC<TrackListProps> = ({ tracks }) => {
  // Sort the tracks by their trackNumber attribute
  const sortedTracks = tracks.slice().sort((a, b) => a.trackNumber! - b.trackNumber!);

  return (
    <ul>
      {sortedTracks.map(track => (
        <li key={track.id}>
          <Track track={track} />
        </li>
      ))}
    </ul>
  );
};

export default TrackList;
