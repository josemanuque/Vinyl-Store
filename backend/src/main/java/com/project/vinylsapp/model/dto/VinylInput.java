package com.project.vinylsapp.model.dto;

import com.project.vinylsapp.model.Artist;

public record VinylInput(String title, String coverImage, String artistId, Float price) {
}
