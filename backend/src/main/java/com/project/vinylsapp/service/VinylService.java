package com.project.vinylsapp.service;

import com.project.vinylsapp.controller.ArtistController;
import com.project.vinylsapp.exception.ArtistNotFoundException;
import com.project.vinylsapp.exception.InvalidVinylInputException;
import com.project.vinylsapp.exception.VinylNotFoundException;
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
        return vinylRepository.findById(id).orElseThrow(()-> new VinylNotFoundException("Vinyl not found with id " + id));
    }

    @Transactional
    public Vinyl createVinyl(VinylInput vinylInput){
        validateVinylInput(vinylInput);
        Artist artist = artistService.findArtistById(vinylInput.artistId());
        Vinyl vinyl = new Vinyl(vinylInput.title(), vinylInput.price(), vinylInput.coverImage(), artist, vinylInput.releaseDate(), vinylInput.description());
        return vinylRepository.save(vinyl);
    }

    @Transactional
    public Vinyl updateVinyl(String id, VinylInput vinylInput) {
        validateVinylInput(vinylInput);
        return vinylRepository.findById(id)
                .map(vinyl -> {
                    vinyl.setTitle(vinylInput.title());
                    vinyl.setPrice(vinylInput.price());
                    vinyl.setCoverImage(vinylInput.coverImage());
                    vinyl.setReleaseDate(vinylInput.releaseDate());
                    vinyl.setDescription(vinylInput.description());

                    if (!vinyl.getArtist().getId().equals(vinylInput.artistId())) {
                        vinyl.setArtist(artistService.findArtistById(vinylInput.artistId()));
                    }
                    return vinylRepository.save(vinyl);
                })
                .orElseThrow(() -> new VinylNotFoundException("Vinyl not found with id " + id));
    }

    public String deleteVinyl(String id) {
        if (!vinylRepository.existsById(id)) {
            throw new VinylNotFoundException("Vinyl not found with id " + id);
        }

        vinylRepository.deleteById(id);
        return "Deleted";
    }

    private void validateVinylInput(VinylInput vinylInput) {
        if (vinylInput.title() == null || vinylInput.title().trim().isEmpty()) {
            throw new InvalidVinylInputException("Vinyl title cannot be null or empty");
        }
        if (vinylInput.price() <= 0) {
            throw new InvalidVinylInputException("Vinyl price must be a positive number");
        }
        if (vinylInput.artistId() == null || vinylInput.artistId().trim().isEmpty()) {
            throw new InvalidVinylInputException("Artist ID cannot be null or empty");
        }
    }
}
