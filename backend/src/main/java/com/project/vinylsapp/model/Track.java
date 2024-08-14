package com.project.vinylsapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
public class Track {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;
    private String title;
    private Integer time;

    @ManyToOne
    @JoinColumn(name = "vinylId")
    @JsonBackReference
    private Vinyl album;

    @ManyToOne
    @JoinColumn(name = "artistId")
    @JsonBackReference
    private Artist artist;

    private String spotifyTrackId;
    private String url;
    private String previewUrl;
    private int trackNumber;

    public Track(){}

    public Track(String url, String title, Integer time, Vinyl album, Artist artist, String spotifyTrackId, String previewUrl, int trackNumber) {
        this.url = url;
        this.title = title;
        this.time = time;
        this.album = album;
        this.artist = artist;
        this.spotifyTrackId = spotifyTrackId;
        this.previewUrl = previewUrl;
        this.trackNumber = trackNumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public Vinyl getAlbum() {
        return album;
    }

    public void setAlbum(Vinyl album) {
        this.album = album;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public int getTrackNumber() {
        return trackNumber;
    }

    public void setTrackNumber(int trackNumber) {
        this.trackNumber = trackNumber;
    }

    public String getPreviewUrl() {
        return previewUrl;
    }

    public void setPreviewUrl(String previewUrl) {
        this.previewUrl = previewUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSpotifyTrackId() {
        return spotifyTrackId;
    }

    public void setSpotifyTrackId(String spotifyTrackId) {
        this.spotifyTrackId = spotifyTrackId;
    }

    public void setTime(Integer time) {
        this.time = time;
    }
}
