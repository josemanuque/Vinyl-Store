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

    public Track(){}

    public Track(String title, int time, Vinyl album, Artist artist) {
        this.title = title;
        this.album = album;
        this.artist = artist;
        this.time = time;
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
}
