package com.project.vinylsapp.service;

import com.project.vinylsapp.controller.ArtistController;
import com.project.vinylsapp.model.Artist;
import com.project.vinylsapp.model.Vinyl;
import com.project.vinylsapp.model.dto.VinylInput;
import com.project.vinylsapp.repository.ArtistRepository;
import com.project.vinylsapp.repository.VinylRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VinylService {
    private final VinylRepository vinylRepository;
    private final ArtistService artistService;

    public VinylService(VinylRepository vinylRepository, ArtistController artistController, ArtistService artistService) {
        this.vinylRepository = vinylRepository;
        this.artistService = artistService;
    }

    public List<Vinyl> findAll() {
        return vinylRepository.findAll();
    }

    public Vinyl findById(String id) {
        return vinylRepository.findById(id).orElse(null);
    }

    @Transactional
    public Vinyl createVinyl(VinylInput vinylInput){
        Artist artist = artistService.findArtistById(vinylInput.artistId().describeConstable().orElseThrow(
                () -> new IllegalArgumentException("Artist not found")
        ));
        Vinyl vinyl = new Vinyl(vinylInput.title(), vinylInput.price(), vinylInput.coverImage(), artist);
        return vinylRepository.save(vinyl);
    }

    @Transactional
    public Vinyl updateVinyl(String id, VinylInput vinylInput) {
        return vinylRepository.findById(id)
                .map(vinyl -> {
                    if (vinylInput.title() != null) {
                        vinyl.setTitle(vinylInput.title());
                    }
                    if (vinylInput.price() != null) {
                        vinyl.setPrice(vinylInput.price());
                    }
                    if (vinylInput.coverImage() != null) {
                        vinyl.setCoverImage(vinylInput.coverImage());
                    }
                    if (vinylInput.artistId() != null && !vinyl.getArtist().getId().equals(vinylInput.artistId())) {
                        vinyl.setArtist(artistService.findArtistById(vinylInput.artistId().describeConstable().orElseThrow(
                                () -> new IllegalArgumentException("Artist not found")
                        )));
                    }
                    return vinylRepository.save(vinyl);
                })
                .orElseThrow(() -> new RuntimeException("Artist not found with id " + id));
    }

    public String deleteVinyl(String id) {
        vinylRepository.deleteById(id);
        return "Deleted";
    }

}
