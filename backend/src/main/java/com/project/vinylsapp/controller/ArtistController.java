package com.project.vinylsapp.controller;

import com.project.vinylsapp.model.Artist;
import com.project.vinylsapp.model.dto.ArtistInput;
import com.project.vinylsapp.service.ArtistService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ArtistController {
    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @QueryMapping
    public List<Artist> findAllArtists() {
        return artistService.findAllArtists();
    }

    @QueryMapping
    public Artist findArtistById(@Argument String id) {
        return artistService.findArtistById(id);
    }

    @MutationMapping
    public Artist createArtist(@Argument ArtistInput artistInput) {
        return artistService.createArtist(artistInput);
    }

    @MutationMapping
    public Artist updateArtist(@Argument String id, @Argument ArtistInput artistInput) {
        return artistService.updateArtist(id, artistInput);
    }

    @MutationMapping
    public String deleteArtist(@Argument String id) {
        return artistService.deleteArtist(id);
    }
}
