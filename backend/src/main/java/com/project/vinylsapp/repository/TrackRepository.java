package com.project.vinylsapp.repository;

import com.project.vinylsapp.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, String> {
}
