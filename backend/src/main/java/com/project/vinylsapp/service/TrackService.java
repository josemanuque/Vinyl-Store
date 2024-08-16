package com.project.vinylsapp.service;

import com.project.vinylsapp.exception.ArtistNotFoundException;
import com.project.vinylsapp.exception.InvalidTrackInputException;
import com.project.vinylsapp.exception.TrackNotFoundException;
import com.project.vinylsapp.exception.VinylNotFoundException;
import com.project.vinylsapp.model.Artist;
import com.project.vinylsapp.model.Track;
import com.project.vinylsapp.model.Vinyl;
import com.project.vinylsapp.model.dto.TrackInput;
import com.project.vinylsapp.repository.TrackRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return trackRepository.findById(id).orElseThrow(()-> new TrackNotFoundException("Track not found with id" + id));
    }

    public Track createTrack(TrackInput trackInput) {
        validateTrackInput(trackInput);
        Artist artist = artistService.findArtistById(trackInput.artistId());
        Vinyl album = vinylService.findById(trackInput.albumId());
        Track track = new Track(trackInput.url(), trackInput.title(), trackInput.time(), album, artist, trackInput.spotifyTrackId(), trackInput.previewUrl(), trackInput.trackNumber());

        return trackRepository.save(track);
    }

    public Track updateTrack(String id, TrackInput trackInput) {
        validateTrackInput(trackInput);
        return trackRepository.findById(id)
                .map(track -> {
                    track.setTitle(trackInput.title());
                    track.setTime(trackInput.time());

                    if (!track.getArtist().getId().equals(trackInput.artistId())) {
                        track.setArtist(artistService.findArtistById(trackInput.artistId()));
                    }
                    if (!track.getAlbum().getId().equals(trackInput.albumId())) {
                        track.setAlbum(vinylService.findById(trackInput.albumId()));
                    }
                    return trackRepository.save(track);
                })
                .orElseThrow(() -> new TrackNotFoundException("Track not found with id " + id));
    }

    public String removeTrack(String id) {
        if (!trackRepository.existsById(id)) {
            throw new TrackNotFoundException("Track not found with id " + id);
        }
        trackRepository.deleteById(id);
        return "Deleted";
    }

    @Transactional
    public List<Track> createTracks(List<TrackInput> trackInputs) {
        List<Track> createdTracks = new ArrayList<>();
        for (TrackInput trackInput : trackInputs) {
            validateTrackInput(trackInput);
            Artist artist = artistService.findArtistById(trackInput.artistId());
            Vinyl album = vinylService.findById(trackInput.albumId());
            Track track = new Track(trackInput.url(), trackInput.title(), trackInput.time(), album, artist, trackInput.spotifyTrackId(), trackInput.previewUrl(), trackInput.trackNumber());
            createdTracks.add(trackRepository.save(track));
        }
        return createdTracks;
    }

    @Transactional
    public List<Track> updateTracks(List<AbstractMap.SimpleEntry<String, TrackInput>> trackUpdates) {
        return trackUpdates.stream()
                .map(entry -> {
                    String trackId = entry.getKey();
                    TrackInput trackInput = entry.getValue();
                    validateTrackInput(trackInput);
                    Optional<Track> optionalTrack = trackRepository.findById(trackId);
                    if (optionalTrack.isPresent()) {
                        Track track = optionalTrack.get();
                        track.setTitle(trackInput.title());
                        track.setTime(trackInput.time());
                        track.setSpotifyTrackId(trackInput.spotifyTrackId());
                        track.setUrl(trackInput.url());
                        track.setPreviewUrl(trackInput.previewUrl());
                        track.setTrackNumber(trackInput.trackNumber());

                        if (!track.getArtist().getId().equals(trackInput.artistId())) {
                            Artist artist = artistService.findArtistById(trackInput.artistId());
                            track.setArtist(artist);
                        }

                        if (!track.getAlbum().getId().equals(trackInput.albumId())) {
                            Vinyl album = vinylService.findById(trackInput.albumId());
                            track.setAlbum(album);
                        }

                        return trackRepository.save(track);
                    } else {
                        throw new TrackNotFoundException("Track not found with id " + trackId);
                    }
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTracks(List<String> trackIds) {
        List<Track> tracksToDelete = trackRepository.findAllById(trackIds);
        if (tracksToDelete.size() != trackIds.size()) {
            throw new TrackNotFoundException("One or more track IDs not found");
        }
        trackRepository.deleteAll(tracksToDelete);
    }

    private void validateTrackInput(TrackInput trackInput) {
        if (trackInput.title() == null || trackInput.title().trim().isEmpty()) {
            throw new InvalidTrackInputException("Track title cannot be null or empty");
        }
        if (trackInput.time() <= 0) {
            throw new InvalidTrackInputException("Track time must be a positive integer");
        }
        if (trackInput.artistId() == null || trackInput.artistId().trim().isEmpty()) {
            throw new InvalidTrackInputException("Artist ID cannot be null or empty");
        }
        if (trackInput.albumId() == null || trackInput.albumId().trim().isEmpty()) {
            throw new InvalidTrackInputException("Album ID cannot be null or empty");
        }
    }
}
