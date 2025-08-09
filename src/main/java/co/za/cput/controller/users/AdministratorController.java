package co.za.cput.controller.users;

import co.za.cput.domain.users.Administrator;
import co.za.cput.service.users.implementation.AdministratorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Administrator")
public class AdministratorController {

    private final AdministratorServiceImpl administratorService;

    @Autowired
    public AdministratorController(AdministratorServiceImpl administratorService) {
        this.administratorService = administratorService;
    }

    @PostMapping("/create")
    public ResponseEntity<Administrator> create(@RequestBody Administrator administrator) {
        Administrator created = administratorService.create(administrator);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/read/{Id}")
    public ResponseEntity<Administrator> read(@PathVariable Long Id) {
        Administrator admin = administratorService.read(Id);
        if (admin == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(admin);
    }

    @PutMapping("/update")
    public ResponseEntity<Administrator> update(@RequestBody Administrator administrator) {
        if (administrator.getAdminID() == null) {
            return ResponseEntity.badRequest().build();
        }
        Administrator updated = administratorService.update(administrator);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/getAllAdministrators")
    public ResponseEntity<List<Administrator>> getAllAdministrators() {
        List<Administrator> admins = administratorService.getAllAdministrators();
        if (admins == null || admins.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(admins);
    }

    @DeleteMapping("/delete/{Id}")
    public void delete(@PathVariable Long Id) {
        administratorService.delete(Id);
    }
}
