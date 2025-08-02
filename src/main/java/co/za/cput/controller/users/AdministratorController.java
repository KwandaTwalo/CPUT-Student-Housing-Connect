package co.za.cput.controller.users;

import co.za.cput.domain.users.Administrator;
import co.za.cput.service.users.implementation.AdministratorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrator")
public class AdministratorController {

    private AdministratorServiceImpl service;

    @Autowired
    public AdministratorController(AdministratorServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/create")
    public Administrator create(@RequestBody Administrator administrator) {
        return service.create(administrator);
    }

    @GetMapping("/read/{adminId}")
    public Administrator read(@PathVariable Long administratorId) {
        return service.read(administratorId);
    }

    @GetMapping("/update")
    public Administrator update(@RequestBody Administrator administrator) {
        return service.update(administrator);
    }

    @DeleteMapping("/delete/{adminId}")
    public void delete(@PathVariable Long administratorId) {
        //return service.delete(administratorId);

    }

    @GetMapping("/getAll")
    public List<Administrator> getAll() {
        return service.getAll();
    }

}
