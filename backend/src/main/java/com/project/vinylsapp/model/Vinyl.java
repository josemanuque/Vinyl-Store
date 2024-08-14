package com.project.vinylsapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Entity
public class Vinyl {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;
    private String title;
    private Float price;

    @Column(length = 1000)
    private String coverImage;

    @ManyToOne
    @JoinColumn(name = "artistId")
    @JsonBackReference
    private Artist artist;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "vinylId")
    @JsonManagedReference
    private List<Track> tracks;

    private String releaseDate;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    public Vinyl(){}

    public Vinyl(String title, Float price, String coverImage, Artist artist, String releaseDate, String description) {
        this.title = title;
        this.price = price;
        this.coverImage = coverImage;
        this.artist = artist;
        this.releaseDate = releaseDate;
        this.description = description;
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

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
