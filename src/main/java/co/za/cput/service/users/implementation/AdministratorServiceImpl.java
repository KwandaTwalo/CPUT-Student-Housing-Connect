package co.za.cput.service.users.implementation;

import co.za.cput.domain.business.Verification;
import co.za.cput.domain.users.Administrator;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.users.AdministratorRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.service.users.IAdministratorService;
import co.za.cput.util.LinkingEntitiesHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdministratorServiceImpl implements IAdministratorService {

    private AdministratorRepository administratorRepository;
    private LandLordRepository landLordRepository;
    private AccommodationRepository accommodationRepository;

    @Autowired
    public AdministratorServiceImpl(AdministratorRepository administratorRepository,
                                    LandLordRepository landLordRepository,
                                    AccommodationRepository accommodationRepository) {
        this.administratorRepository = administratorRepository;
        this.landLordRepository = landLordRepository;
        this.accommodationRepository = accommodationRepository;
    }

    @Override
    public Administrator create(Administrator administrator) {
        // First, prepare accommodation and landlord inside verifications
        Administrator preparedAdmin = LinkingEntitiesHelper.prepareAdministratorForSave(
                administrator,
                accommodationRepository,
                landLordRepository
        );

        // Step 1: Save the admin WITHOUT verifications
        Administrator adminWithoutVerifications = new Administrator.Builder()
                .copy(preparedAdmin)
                .setVerifications(null)
                .build();

        Administrator savedAdmin = administratorRepository.save(adminWithoutVerifications);

        // Step 2: Now set back-reference and save verifications
        Administrator finalSavedAdmin = savedAdmin;
        List<Verification> verificationsWithAdmin = preparedAdmin.getVerifications().stream()
                .map(verification -> new Verification.Builder()
                        .copy(verification)
                        .setAdministrator(finalSavedAdmin)
                        .build())
                .collect(Collectors.toList());

        savedAdmin = new Administrator.Builder()
                .copy(savedAdmin)
                .setVerifications(verificationsWithAdmin)
                .build();

        return administratorRepository.save(savedAdmin);
    }


    @Override
    public Administrator read(Long Id) {
        return administratorRepository.findById(Id).orElse(null);  
    }

    @Override
    public Administrator update(Administrator administrator) {
        return administratorRepository.save(administrator);
    }

    @Override
    public List<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }

    @Override
    public void delete(Long Id) {
        administratorRepository.deleteById(Id);

    }
}
