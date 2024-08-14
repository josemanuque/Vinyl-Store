import { FC, useRef, useState } from "react";
import { TrackProps } from "../../interfaces/Track.Interface";
import useFormatDuration from "../../hooks/useFormatDuration";
import styles from './Track.module.css';
import { CgMenuGridO } from "react-icons/cg";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";


const Track: FC<TrackProps> = ({ track, onClick }) => {
    const { formatDuration } = useFormatDuration();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);


    const togglePlayPause = () => {
      if (audioRef.current) {
          if (isPlaying) {
              audioRef.current.pause();
          } else {
              audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
      }
    };

  
    const content = (
        <div className={`${styles.trackItem} hover-effect`}>
            <p>{track.title}</p>
            <p>{formatDuration(track.time)}</p>
        </div>
    )
    if (onClick) {
      // Render a button if there's an onClick handler (editing mode)
      return (
        <div className={`${styles.trackItemContainer} ${styles.grabbableItem}`}>
            <p>{track.trackNumber}</p>
            <CgMenuGridO className='icon-wrapper'/>
            <button 
            onClick={onClick} 
            type="button"
            aria-label={`Edit track ${track.trackNumber} ${track.title} button`}
            className="transparent-button btn-no-hover full-width"
            >
                {content}
            </button>
        </div>
        
      );
    } else {
      // Render an anchor tag if no onClick handler (view mode)
      return (
        <div className={`${styles.trackItemContainer} ${styles.grabbableItem}`}>
            <p>{track.trackNumber}.</p>
            <button className="transparent-button center-logo" onClick={togglePlayPause} aria-label="Play or pause the song button">
                  {isPlaying ? <BsFillPauseFill className="icon-wrapper large-icon"/> : <BsFillPlayFill className="icon-wrapper large-icon"/> }
            </button>
            <audio ref={audioRef} src={track.previewUrl} />
            <a 
            className="transparent-button btn-no-hover full-width"
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            >
                {content}
            </a>
        </div>
      );
    }
  };

export default Track;