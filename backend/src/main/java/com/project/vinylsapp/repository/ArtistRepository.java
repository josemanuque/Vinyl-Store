package com.project.vinylsapp.repository;

import com.project.vinylsapp.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, String> {
}
