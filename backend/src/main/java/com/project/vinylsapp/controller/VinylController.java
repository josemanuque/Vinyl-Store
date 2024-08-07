package com.project.vinylsapp.controller;

import com.project.vinylsapp.model.Vinyl;
import com.project.vinylsapp.model.dto.VinylInput;
import com.project.vinylsapp.service.VinylService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class VinylController {
    private final VinylService vinylService;

    public VinylController(VinylService vinylService) {
        this.vinylService = vinylService;
    }


    @QueryMapping
    public List<Vinyl> findAllVinyls(){
        return vinylService.findAll();
    }

    @QueryMapping
    public Vinyl findVinylById(@Argument String id) {
        return vinylService.findById(id);
    }

    @MutationMapping
    public Vinyl createVinyl(@Argument VinylInput vinylInput) {
        return vinylService.createVinyl(vinylInput);
    }

    @MutationMapping
    public Vinyl updateVinyl(@Argument String id, @Argument VinylInput vinylInput) {
        return vinylService.updateVinyl(id, vinylInput);
    }

    @MutationMapping
    public String deleteVinyl(@Argument String id) {
        return vinylService.deleteVinyl(id);
    }
}
