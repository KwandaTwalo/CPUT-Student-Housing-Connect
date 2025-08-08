package co.za.cput.service.business.implementation;

//Firstname: Siyabonga
//Lastname: Jiyane
//Student Number: 222359676


import co.za.cput.domain.business.Verification;
import co.za.cput.repository.business.VerificationRepository;
import co.za.cput.service.business.IVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VerificationServiceImpl implements IVerificationService {

    private final VerificationRepository repository;

    @Autowired
    public VerificationServiceImpl(VerificationRepository repository) {
        this.repository = repository;
    }

    @Override
    public Verification create(Verification verification) {
        return repository.save(verification);
    }

    @Override
    public Verification read(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Verification update(Verification verification) {
        if (repository.existsById(verification.getVerificationId())) {
            return repository.save(verification);
        }
        return null;
    }

    @Override
    public boolean delete(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Verification> findAll() {
        return repository.findAll();
    }
}
