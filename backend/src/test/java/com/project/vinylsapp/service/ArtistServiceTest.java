package com.project.vinylsapp.service;

import com.project.vinylsapp.model.Artist;
import com.project.vinylsapp.model.dto.ArtistInput;
import com.project.vinylsapp.repository.ArtistRepository;
import com.project.vinylsapp.repository.VinylRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class ArtistServiceTest {

@Mock
private ArtistRepository artistRepository;

@Mock
private VinylRepository vinylRepository;

@InjectMocks
private ArtistService artistService;

@BeforeEach
void setUp() {
    MockitoAnnotations.openMocks(this);
}

@Test
void testSaveArtist() {
    ArtistInput input = new ArtistInput("Test Artist", "Biography", "imageURL");
    Artist artist = new Artist(input.name(), input.biography(),input.imageURL());

    when(artistRepository.save(any(Artist.class))).thenReturn(artist);

    Artist savedArtist = artistService.createArtist(input);

    assertNotNull(savedArtist);
    assertEquals("Test Artist", savedArtist.getName());
    verify(artistRepository, times(1)).save(any(Artist.class));
}

@Test
void testGetAllArtists() {
    Artist artist1 = new Artist("Artist 1", "imageURL1", "Biography 1");
    Artist artist2 = new Artist("Artist 2", "imageURL2", "Biography 2");

    when(artistRepository.findAll()).thenReturn(Arrays.asList(artist1, artist2));

    List<Artist> artists = artistService.findAllArtists();

    assertNotNull(artists);
    assertEquals(2, artists.size());
    verify(artistRepository, times(1)).findAll();
}

@Test
void testGetArtistById() {
    Artist artist = new Artist("Artist 1", "imageURL1", "Biography 1");
    String artistId = "1";

    when(artistRepository.findById(artistId)).thenReturn(Optional.of(artist));

    Artist foundArtist = artistService.findArtistById(artistId);

    assertNotNull(foundArtist);
    assertEquals("Artist 1", foundArtist.getName());
    verify(artistRepository, times(1)).findById(artistId);
}

@Test
void testUpdateArtist() {
    Artist artist = new Artist("Artist 1", "imageURL1", "Biography 1");
    String artistId = "1";
    ArtistInput updatedDetails = new ArtistInput("Updated Name", "newImageURL", "New Biography");

    when(artistRepository.findById(artistId)).thenReturn(Optional.of(artist));
    when(artistRepository.save(any(Artist.class))).thenReturn(artist);

    Artist updatedArtist = artistService.updateArtist(artistId, updatedDetails);

    assertNotNull(updatedArtist);
    assertEquals("Updated Name", updatedArtist.getName());
    verify(artistRepository, times(1)).findById(artistId);
    verify(artistRepository, times(1)).save(artist);
}

}
