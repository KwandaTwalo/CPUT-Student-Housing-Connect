package co.za.cput.service.users.implementation;

import co.za.cput.domain.users.Administrator;
import co.za.cput.repository.users.AdministratorRepository;
import co.za.cput.service.users.IAdministratorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministratorServiceImpl implements IAdministratorService {

    @Autowired
    private static IAdministratorService service;
    private AdministratorRepository repository;

    @Override
    public Administrator create(Administrator administrator) {
        return this.repository.save(administrator);
    }

    @Override
    public Administrator read(Long id) {
        return this.repository.findById(id).orElse(null);
    }

    @Override
    public Administrator update(Administrator administrator) {
        return this.repository.save(administrator);
    }

    @Override
    public boolean delete(Long id) {
        this.repository.deleteById(id);
        return true;
    }

    @Override
    public List<Administrator> getAll() {
        return this.repository.findAll();
    }
}
