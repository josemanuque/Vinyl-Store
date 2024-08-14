package com.project.vinylsapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.Set;

@Entity
public class Artist {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;
    private String name;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String biography;
    private String imageURL;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "artistId")
    @JsonManagedReference
    private Set<Vinyl> vinyls;


    public Artist(){
    }

    public Artist(String name, String biography, String imageURL) {
        this.name = name;
        this.biography = biography;
        this.imageURL = imageURL;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Set<Vinyl> getVinyls() {
        return vinyls;
    }

    public void setVinyls(Set<Vinyl> vinyls) {
        this.vinyls = vinyls;
    }

    public void addVinyl(Vinyl vinyl) {
        this.vinyls.add(vinyl);
        vinyl.setArtist(this);
    }

    public void removeVinyl(Vinyl vinyl) {
        this.vinyls.remove(vinyl);
        vinyl.setArtist(null);
    }


}
