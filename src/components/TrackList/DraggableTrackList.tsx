import { FC } from 'react';
import { List, arrayMove } from 'react-movable';
import Track from '../Track/Track';
import { TrackListProps } from '../../interfaces/Track.Interface';
import styles from './TrackList.module.css';

const DraggableTrackList: FC<TrackListProps> = ({ tracks, setTracks, onAddTrack }) => {
    const sortedTracks = tracks.slice().sort((a, b) => a.trackNumber! - b.trackNumber!);

    return (
      <List
        values={sortedTracks}
        onChange={({ oldIndex, newIndex }) => {
          const newTracks = arrayMove(sortedTracks, oldIndex, newIndex).map((track, index) => ({
            ...track,
            trackNumber: index + 1,
        }));
        setTracks(newTracks);
        }}
        renderList={({ children, props }) => (
          <ul className={styles.tracklist} {...props}>
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged, isSelected, index }) => {
          const { key, ...restProps } = props; // Destructure key from props
          return (
            <li
              key={value.title} // Apply key directly
              {...restProps} // Spread the remaining props
              style={{
                ...restProps.style,
                listStyleType: 'none',
              }}
            >
              <Track
                track={value}
                onClick={() => {
                  onAddTrack!(value.id);
                }}
              />
            </li>
          );
        }}
      />
    )
  };
  
  export default DraggableTrackList;
