package com.project.vinylsapp.controller;

import com.project.vinylsapp.model.Track;
import com.project.vinylsapp.model.dto.TrackInput;
import com.project.vinylsapp.service.TrackService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

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
}
