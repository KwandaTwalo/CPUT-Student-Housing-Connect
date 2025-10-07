package co.za.cput.service.business.implementation;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.dto.AccommodationSearchCriteria;
import co.za.cput.dto.AccommodationSummary;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.service.business.IAccommodationService;
import co.za.cput.repository.business.specification.AccommodationSpecifications;
import co.za.cput.util.LinkingEntitiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
    public List<AccommodationSummary> search(AccommodationSearchCriteria criteria) {
        Specification<Accommodation> specification = Specification.where(null);

        if (criteria != null) {
            specification = criteria.minRentOptional()
                    .map(AccommodationSpecifications::rentGreaterThanOrEqual)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.maxRentOptional()
                    .map(AccommodationSpecifications::rentLessThanOrEqual)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.wifiAvailableOptional()
                    .map(AccommodationSpecifications::hasWifi)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.furnishedOptional()
                    .map(AccommodationSpecifications::isFurnished)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.utilitiesIncludedOptional()
                    .map(AccommodationSpecifications::utilitiesIncluded)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.maxDistanceFromCampusOptional()
                    .map(AccommodationSpecifications::withinDistance)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.roomTypeOptional()
                    .map(AccommodationSpecifications::hasRoomType)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.bathroomTypeOptional()
                    .map(AccommodationSpecifications::hasBathroomType)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.statusOptional()
                    .map(AccommodationSpecifications::hasStatus)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.cityOptional()
                    .filter(city -> !city.isBlank())
                    .map(AccommodationSpecifications::matchesCity)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.suburbOptional()
                    .map(AccommodationSpecifications::matchesSuburb)
                    .map(specification::and)
                    .orElse(specification);

            specification = criteria.landlordIdOptional()
                    .map(AccommodationSpecifications::ownedBy)
                    .map(specification::and)
                    .orElse(specification);
        }

        List<Accommodation> results = specification == null
                ? accommodationRepository.findAll()
                : accommodationRepository.findAll(specification);

        return results.stream()
                .filter(Objects::nonNull)
                .map(this::toSummary)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long Id) {
        accommodationRepository.deleteById(Id);
    }

    private AccommodationSummary toSummary(Accommodation accommodation) {
        if (accommodation == null) {
            return null;
        }

        String landlordName = null;
        String landlordEmail = null;

        if (accommodation.getLandlord() != null) {
            landlordName = String.format("%s %s",
                    valueOrEmpty(accommodation.getLandlord().getLandlordFirstName()),
                    valueOrEmpty(accommodation.getLandlord().getLandlordLastName())).trim();
            if (accommodation.getLandlord().getContact() != null) {
                landlordEmail = accommodation.getLandlord().getContact().getEmail();
            }
        }

        String street = accommodation.getAddress() != null
                ? String.format("%s %s",
                valueOrEmpty(accommodation.getAddress().getStreetNumber()),
                valueOrEmpty(accommodation.getAddress().getStreetName())).trim()
                : null;

        String suburb = accommodation.getAddress() != null ? accommodation.getAddress().getSuburb() : null;
        String city = accommodation.getAddress() != null ? accommodation.getAddress().getCity() : null;

        return new AccommodationSummary(
                accommodation.getAccommodationID(),
                accommodation.getRent(),
                accommodation.getIsWifiAvailable(),
                accommodation.getIsFurnished(),
                accommodation.getIsUtilitiesIncluded(),
                accommodation.getDistanceFromCampus(),
                accommodation.getRoomType(),
                accommodation.getBathroomType(),
                accommodation.getAccommodationStatus(),
                street,
                suburb,
                city,
                landlordName != null ? landlordName : null,
                landlordEmail
        );
    }

    private String valueOrEmpty(String value) {
        return value == null ? "" : value;
    }
}