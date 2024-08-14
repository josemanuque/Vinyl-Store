package com.project.vinylsapp.controller;

import com.project.vinylsapp.model.Track;
import com.project.vinylsapp.model.dto.ArtistInput;
import com.project.vinylsapp.model.dto.TrackInput;
import com.project.vinylsapp.model.dto.TrackUpdateInput;
import com.project.vinylsapp.service.TrackService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.AbstractMap;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class TrackController {
    private final TrackService trackService;

    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @QueryMapping
    public List<Track> findAllTracks() {
        return trackService.findAllTracks();
    }

    @QueryMapping
    public Track findTrackById(@Argument String id) {
        return trackService.findTrackById(id);
    }

    @MutationMapping
    public Track createTrack(@Argument TrackInput trackInput) {
        return trackService.createTrack(trackInput);
    }

    @MutationMapping
    public Track updateTrack(@Argument String id, @Argument TrackInput trackInput) {
        return trackService.updateTrack(id, trackInput);
    }

    @MutationMapping
    public String deleteTrack(@Argument String id) {
        return trackService.removeTrack(id);
    }

    @MutationMapping
    public List<Track> createTracks(@Argument List<TrackInput> trackInputList) {
        return trackService.createTracks(trackInputList);
    }

    @MutationMapping
    public List<Track> updateTracks(@Argument List<TrackUpdateInput> trackUpdates) {
        List<AbstractMap.SimpleEntry<String, TrackInput>> updateList = trackUpdates.stream()
                .map(update -> new AbstractMap.SimpleEntry<>(update.id(), update.trackInput()))
                .collect(Collectors.toList());

        return trackService.updateTracks(updateList);
    }

    @MutationMapping
    public String deleteTracks(@Argument List<String> trackIds) {
        trackService.deleteTracks(trackIds);
        return "Deleted";
    }
}
