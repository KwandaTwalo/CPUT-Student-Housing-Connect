package co.za.cput.service.users.implementation;

import co.za.cput.domain.business.Verification;
import co.za.cput.domain.users.Administrator;
import co.za.cput.domain.users.Landlord;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.business.VerificationRepository;
import co.za.cput.repository.users.AdministratorRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.service.users.IAdministratorService;
import co.za.cput.util.Helper;
import co.za.cput.util.LinkingEntitiesHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdministratorServiceImpl implements IAdministratorService {

    private final AdministratorRepository administratorRepository;
    private final LandLordRepository landLordRepository;
    private final AccommodationRepository accommodationRepository;
    private final VerificationRepository verificationRepository;

    @Autowired
    public AdministratorServiceImpl(AdministratorRepository administratorRepository,
                                    LandLordRepository landLordRepository,
                                    AccommodationRepository accommodationRepository,
                                    VerificationRepository verificationRepository) {
        this.administratorRepository = administratorRepository;
        this.landLordRepository = landLordRepository;
        this.accommodationRepository = accommodationRepository;
        this.verificationRepository = verificationRepository;
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

        Administrator savedAdmin = administratorRepository.saveAndFlush(adminWithoutVerifications);

        // Step 2: Now set back-reference and save verifications
        List<Verification> preparedVerifications = preparedAdmin.getVerifications();
        if (preparedVerifications == null || preparedVerifications.isEmpty()) {
            return savedAdmin;
        }

        Administrator finalSavedAdmin = savedAdmin;
        List<Verification> verificationsWithAdmin = preparedVerifications.stream()
                .map(verification -> new Verification.Builder()
                        .copy(verification)
                        .setAdministrator(finalSavedAdmin)
                        .build())
                .collect(Collectors.toList());

        savedAdmin = new Administrator.Builder()
                .copy(savedAdmin)
                .setVerifications(verificationsWithAdmin)
                .build();

        return administratorRepository.saveAndFlush(savedAdmin);
    }


    @Override
    public Administrator read(Long Id) {
        return administratorRepository.findById(Id).orElse(null);
    }

    @Override
    public Administrator update(Administrator administrator) {
        return administratorRepository.saveAndFlush(administrator);
    }

    @Override
    public List<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }

    @Override
    public boolean hasAnyAdministrators() {
        return administratorRepository.count() > 0;
    }

    @Override
    public Administrator authenticateAdmin(Long adminId, String adminPassword) {
        if (adminId == null || Helper.isNullorEmpty(adminPassword)) {
            return null;
        }

        return administratorRepository.findById(adminId)
                .filter(admin -> admin.getAdminRoleStatus() == Administrator.AdminRoleStatus.ACTIVE)
                .filter(admin -> adminPassword.equals(admin.getAdminPassword()))
                .orElse(null);
    }

    @Override
    public Landlord verifyLandlord(Long adminId, String adminPassword, Long landlordId, boolean approved) {
        Administrator administrator = authenticateAdmin(adminId, adminPassword);
        if (administrator == null) {
            throw new IllegalArgumentException("Invalid administrator credentials.");
        }

        Landlord landlord = landLordRepository.findById(landlordId)
                .orElseThrow(() -> new IllegalArgumentException("Landlord not found."));

        Landlord updatedLandlord = new Landlord.Builder()
                .copy(landlord)
                .setVerified(approved)
                .build();

        return landLordRepository.saveAndFlush(updatedLandlord);
    }

    @Override
    public Verification verifyListing(Long adminId, String adminPassword, Long verificationId,
                                      Verification.VerificationStatus status, String notes) {
        Administrator administrator = authenticateAdmin(adminId, adminPassword);
        if (administrator == null) {
            throw new IllegalArgumentException("Invalid administrator credentials.");
        }

        if (status == null) {
            throw new IllegalArgumentException("Verification status is required.");
        }

        Verification existingVerification = verificationRepository.findById(verificationId)
                .orElseThrow(() -> new IllegalArgumentException("Verification not found."));

        LocalDateTime now = LocalDateTime.now();
        Verification.Builder builder = new Verification.Builder()
                .copy(existingVerification)
                .setAdministrator(administrator)
                .setVerificationStatus(status)
                .setVerificationDate(LocalDate.now())
                .setUpdateAt(now)
                .setNotes(notes != null ? notes : existingVerification.getNotes());

        if (existingVerification.getCreateAt() == null) {
            builder.setCreateAt(now);
        }

        Verification updatedVerification = builder.build();
        return verificationRepository.saveAndFlush(updatedVerification);
    }

    @Override
    public void delete(Long Id) {
        administratorRepository.deleteById(Id);

    }
}
