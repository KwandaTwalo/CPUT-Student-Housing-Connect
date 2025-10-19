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

    private VerificationRepository verificationRepository;

    @Autowired
    public VerificationServiceImpl(VerificationRepository verificationRepository) {
        this.verificationRepository = verificationRepository;
    }

    @Override
    public Verification create(Verification verification) {
        return verificationRepository.saveAndFlush(verification);
    }

    @Override
    public Verification read(Long Id) {
        return verificationRepository.findById(Id).orElse(null);
    }

    @Override
    public Verification update(Verification verification) {
        return verificationRepository.saveAndFlush(verification);
    }

    @Override
    public List<Verification> getAllVerifications() {
        return verificationRepository.findAll();
    }

    @Override
    public void delete(Long aLong) {
        verificationRepository.deleteById(aLong);
    }
}
