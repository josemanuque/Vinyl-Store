package com.project.vinylsapp.model.dto;

public record TrackInput(
        String title,
        Integer time,
        String albumId,    // ID of the associated Vinyl
        String artistId,   // ID of the associated Artist
        String spotifyTrackId, // Spotify track ID
        String url,            // URL of the track (e.g., streaming URL)
        String previewUrl,     // Preview URL of the track
        int trackNumber        // Track number in the album
) {
}