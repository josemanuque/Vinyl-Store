package com.project.vinylsapp.service;

import com.project.vinylsapp.exception.ArtistNotFoundException;
import com.project.vinylsapp.exception.InvalidArtistInputException;
import com.project.vinylsapp.model.Artist;
import com.project.vinylsapp.model.Vinyl;
import com.project.vinylsapp.model.dto.ArtistInput;
import com.project.vinylsapp.model.dto.VinylInput;
import com.project.vinylsapp.repository.ArtistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository){
        this.artistRepository = artistRepository;
    }

    public List<Artist> findAllArtists() {
        return artistRepository.findAll();
    }

    public Artist findArtistById(String id) {
        return artistRepository.findById(id)
                .orElseThrow(()-> new ArtistNotFoundException(("Artist not found with id " + id)));
    }

    public Artist createArtist(ArtistInput artistInput) {
        validateArtistInput(artistInput);
        Artist artist = new Artist(artistInput.name(), artistInput.biography(), artistInput.imageURL());
        return artistRepository.save(artist);
    }

    public Artist updateArtist(String id, ArtistInput artistInput) {
        validateArtistInput(artistInput);
        return artistRepository.findById(id)
                .map(artist -> {
                    artist.setName(artistInput.name());
                    artist.setBiography(artistInput.biography());
                    artist.setImageURL(artistInput.imageURL());

                    return artistRepository.save(artist);
                })
                .orElseThrow(() -> new ArtistNotFoundException("Artist not found with id " + id));
    }
    

    public String deleteArtist(String id) {

        if (!artistRepository.existsById(id)) {
            throw new ArtistNotFoundException("Artist not found with id " + id);
        }

        artistRepository.deleteById(id);

        return "Deleted";
    }

    private void validateArtistInput(ArtistInput artistInput) {
        if (artistInput.name() == null || artistInput.name().trim().isEmpty()) {
            throw new InvalidArtistInputException("Artist name cannot be null or empty");
        }
    }
}
