package co.za.cput.controller.business;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.service.business.implementation.AccommodationServiceImpl;

import co.za.cput.service.users.implementation.AdministratorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accommodationId")

public class AccommodationController {

    private AccommodationServiceImpl service;

    @Autowire
    public AccommodationController(AccommodationServiceImpl service){
        this.service = service;
    }
    @PostMapping("/create")
    public Accommodation create(@RequestBody Accommodation accommodation){
        return service.create(accommodation);
    }
    @GetMapping("/read/{landlordId}")
    public Accommodation read(@PathVariable Long accommodationId){
        return service.read(accommodationId);
    }
    @GetMapping("/update")
    public Accommodation update(@RequestBody Accommodation accommodation){
        return service.update(accommodation);
    }
    @DeleteMapping("/delete/{accommodationId}")
    public void delete(@PathVariable Long accommodationId){
        service.delete(accommodationId);
    }
    @GetMapping("/getAll")
    public List<Accommodation> getAll() {
        return service.getAll();
    }
}
