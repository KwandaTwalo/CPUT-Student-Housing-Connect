package co.za.cput.controller.business;
//Firstname: Siyabonga
//Lastname: Jiyane
//Student Number: 222359676

import co.za.cput.domain.business.Verification;
import co.za.cput.service.business.implementation.VerificationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/verification")
public class VerificationController {

    private final VerificationServiceImpl verificationService;

    @Autowired
    public VerificationController(VerificationServiceImpl verificationService) {
        this.verificationService = verificationService;
    }

    @PostMapping
    public Verification create(@RequestBody Verification verification) {
        return verificationService.create(verification);
    }

    @GetMapping("/{id}")
    public Verification read(@PathVariable String id) {
        return verificationService.read(id);
    }

    @PutMapping
    public Verification update(@RequestBody Verification verification) {
        return verificationService.update(verification);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable String id) {
        return verificationService.delete(id);
    }

    @GetMapping
    public List<Verification> findAll() {
        return verificationService.findAll();
    }
}