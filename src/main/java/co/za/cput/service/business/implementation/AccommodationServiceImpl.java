package co.za.cput.service.business.implementation;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.service.business.IAccommodationService;
import co.za.cput.util.LinkingEntitiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationServiceImpl implements IAccommodationService {

    private AccommodationRepository accommodationRepository;
    private LandLordRepository landLordRepository;

    @Autowired
    public AccommodationServiceImpl(AccommodationRepository accommodationRepository,
                                    LandLordRepository landLordRepository) {
        this.accommodationRepository = accommodationRepository;
        this.landLordRepository = landLordRepository;
    }

    @Override
    public Accommodation create(Accommodation accommodation) {
        Accommodation linkedAccommodation = LinkingEntitiesHelper.linkLandlord(accommodation, landLordRepository);
        return accommodationRepository.save(linkedAccommodation);
    }

    @Override
    public Accommodation read(Long Id) {
        return accommodationRepository.findById(Id).orElse(null);
    }

    @Override
    public Accommodation update(Accommodation accommodation) {
        if (!accommodationRepository.existsById(accommodation.getAccommodationID())) {
            return null;
        }

        Accommodation linkedAccommodation = LinkingEntitiesHelper.linkLandlord(accommodation, landLordRepository);
        return accommodationRepository.save(linkedAccommodation);
    }

    @Override
    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    @Override
    public void delete(Long Id) {
        accommodationRepository.deleteById(Id);
    }

}

