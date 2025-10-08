package co.za.cput.service.users.implementation;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.users.Landlord;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.service.users.ILandLordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LandLordServiceImpl implements ILandLordService {

    private LandLordRepository landLordRepository;
    private AccommodationRepository accommodationRepository;

    @Autowired
    public LandLordServiceImpl(LandLordRepository landLordRepository,
                               AccommodationRepository accommodationRepository) {
        this.landLordRepository = landLordRepository;
        this.accommodationRepository = accommodationRepository;
    }    

    @Override
    @Transactional
    public Landlord create(Landlord landlord) {
        // Step 1: Save landlord without accommodations
        Landlord savedLandlord = new Landlord.Builder()
                .copy(landlord)
                .setAccommodationList(null)
                .build();

        savedLandlord = landLordRepository.saveAndFlush(savedLandlord);

        // Step 2: Link accommodations to savedLandlord
        List<Accommodation> linkedAccommodations = new ArrayList<>();
        if (landlord.getAccommodationList() != null) {
            for (Accommodation accommodation : landlord.getAccommodationList()) {
                Accommodation linkedAccommodation = new Accommodation.Builder()
                        .copy(accommodation)
                        .setLandlord(savedLandlord)
                        .build();
                linkedAccommodations.add(accommodationRepository.saveAndFlush(linkedAccommodation)); // Save directly
            }
        }

        // Step 3: Return saved landlord with linked accommodations (optional)
        return savedLandlord;
    }





    @Override
    public Landlord read(Long Id) {
        return landLordRepository.findById(Id).orElse(null);
    }

   

    @Override
    public Landlord update(Landlord landlord) {
        if (landlord == null || landlord.getLandlordID() == null) {
            throw new IllegalArgumentException("Landlord or Landlord ID must not be null");
        }

        // Step 1: Fetch existing landlord (managed instance)
        Landlord existing = landLordRepository.findById(landlord.getLandlordID())
                .orElseThrow(() -> new IllegalArgumentException("Landlord not found"));

        // Step 2: Link accommodations to managed landlord
        List<Accommodation> fixedAccommodations = null;
        if (landlord.getAccommodationList() != null) {
            fixedAccommodations = landlord.getAccommodationList().stream()
                    .map(acc -> new Accommodation.Builder()
                            .copy(acc)
                            .setLandlord(existing) // prevent detached instance issue
                            .build())
                    .collect(Collectors.toList());
        }

        // Step 3: Rebuild landlord with fixed accommodations
        Landlord updated = new Landlord.Builder()
                .copy(landlord)
                .setLandlordID(existing.getLandlordID())
                .setAccommodationList(fixedAccommodations)
                .build();

        // Step 4: Save updated landlord
        return landLordRepository.saveAndFlush(updated);
    }

    @Override
    public List<Landlord> getAllLandlords() {
        return landLordRepository.findAll();
    }

    @Override
    public void delete(Long Id) {
        landLordRepository.deleteById(Id);
    }
}
