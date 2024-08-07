package com.project.vinylsapp.service;

import com.project.vinylsapp.model.Artist;
import com.project.vinylsapp.model.Track;
import com.project.vinylsapp.model.Vinyl;
import com.project.vinylsapp.model.dto.TrackInput;
import com.project.vinylsapp.repository.TrackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackService {
    private final TrackRepository trackRepository;
    private final ArtistService artistService;
    private final VinylService vinylService;

    public TrackService(TrackRepository trackRepository, ArtistService artistService, VinylService vinylService){
        this.trackRepository = trackRepository;
        this.artistService = artistService;
        this.vinylService = vinylService;
    }

    public List<Track> findAllTracks() {
        return trackRepository.findAll();
    }

    public Track findTrackById(String id) {
        return trackRepository.findById(id).orElse(null);
    }

    public Track createTrack(TrackInput trackInput) {
        Artist artist = artistService.findArtistById(trackInput.artistId());
        Vinyl album = vinylService.findById(trackInput.albumId());
        Track track = new Track(trackInput.title(), trackInput.time(), album, artist);

        return trackRepository.save(track);
    }

    public Track updateTrack(String id, TrackInput trackInput) {
        return trackRepository.findById(id)
                .map(track -> {
                    if (trackInput.title() != null) {
                        track.setTitle(trackInput.title());
                    }
                    if (trackInput.time() != null) {
                        track.setTime(trackInput.time());
                    }
                    if (trackInput.artistId() != null && !track.getArtist().getId().equals(trackInput.artistId())) {
                        track.setArtist(artistService.findArtistById(trackInput.artistId().describeConstable().orElseThrow(
                                () -> new IllegalArgumentException("Artist not found")
                        )));
                    }
                    if (trackInput.albumId() != null && !track.getAlbum().getId().equals(trackInput.albumId())) {
                        track.setAlbum(vinylService.findById(trackInput.albumId().describeConstable().orElseThrow(
                                () -> new IllegalArgumentException("Album not found")
                        )));
                    }
                    return trackRepository.save(track);
                })
                .orElseThrow(() -> new RuntimeException("Artist not found with id " + id));
    }

    public String removeTrack(String id) {
        trackRepository.deleteById(id);
        return "Deleted";
    }
}
