package co.za.cput.controller.users;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import co.za.cput.service.users.implementation.LandLordServiceImpl;

import co.za.cput.service.users.implementation.AdministratorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/landlord")

public class LandLordController {


    private LandLordServiceImpl service;

    @Autowire
    public LandLordController(LandLordServiceImpl service){
        this.service = service;
    }
    @PostMapping("/create")
    public Landlord create(@RequestBody Landlord landlord){
        return service.create(landlord);
    }
    @GetMapping("/read/{landlordId}")
    public Landlord read(@PathVariable Long landlordId){
        return service.read(landlordId);
    }
    @GetMapping("/update")
    public Landlord update(@RequestBody Landlord landlord){
        return service.update(landlord);
    }
    @DeleteMapping("/delete/{landlordId}")
    public void delete(@PathVariable Long landlordId){
        service.delete(landlordId);
    }
    @GetMapping("/getAll")
    public List<Landlord>getAll() {
        return service.getAll();
    }

}
