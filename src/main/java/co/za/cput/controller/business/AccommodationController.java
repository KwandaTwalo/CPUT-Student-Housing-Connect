package co.za.cput.controller.business;

import co.za.cput.domain.business.Accommodation;
import co.za.cput.dto.AccommodationSearchCriteria;
import co.za.cput.dto.AccommodationSummary;
import co.za.cput.service.business.implementation.AccommodationServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AccommodationController.class);

    private final AccommodationServiceImpl accommodationService;

    public AccommodationController(AccommodationServiceImpl accommodationService) {
        this.accommodationService = accommodationService;
    }

    @PostMapping("/create")
    public ResponseEntity<Accommodation> create(@RequestBody Accommodation accommodation) {
        log.debug("Received create request: {}", accommodation);
        Accommodation created = accommodationService.create(accommodation);
        log.debug("Created accommodation response: {}", created);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/read/{accommodationID}")
    public ResponseEntity<Accommodation> read(@PathVariable("accommodationID") Long accommodationID) {
        Accommodation readAccommodation = accommodationService.read(accommodationID);
        if (readAccommodation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(readAccommodation);
    }

    @PutMapping("/update")
    public ResponseEntity<Accommodation> update(@RequestBody Accommodation accommodation) {
        if (accommodation.getAccommodationID() == null) {
            return ResponseEntity.badRequest().build();
        }
        Accommodation updated = accommodationService.update(accommodation);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping({"/getAllAccommodations", "/getAllAccommodation"})
    public ResponseEntity<List<Accommodation>> getAllAccommodations() {
        List<Accommodation> all = accommodationService.getAllAccommodations();
        if (all == null || all.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(all);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AccommodationSummary>> search(
            @RequestParam(value = "minRent", required = false) Double minRent,
            @RequestParam(value = "maxRent", required = false) Double maxRent,
            @RequestParam(value = "wifiAvailable", required = false) Boolean wifiAvailable,
            @RequestParam(value = "furnished", required = false) Boolean furnished,
            @RequestParam(value = "utilitiesIncluded", required = false) Boolean utilitiesIncluded,
            @RequestParam(value = "maxDistanceFromCampus", required = false) Double maxDistanceFromCampus,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "suburb", required = false) String suburb,
            @RequestParam(value = "roomType", required = false) Accommodation.RoomType roomType,
            @RequestParam(value = "bathroomType", required = false) Accommodation.BathroomType bathroomType,
            @RequestParam(value = "status", required = false) Accommodation.AccommodationStatus status,
            @RequestParam(value = "landlordId", required = false) Long landlordId
    ) {
        AccommodationSearchCriteria criteria = new AccommodationSearchCriteria(
                minRent,
                maxRent,
                wifiAvailable,
                furnished,
                utilitiesIncluded,
                maxDistanceFromCampus,
                city,
                suburb,
                roomType,
                bathroomType,
                status,
                landlordId
        );

        List<AccommodationSummary> results = accommodationService.search(criteria);
        if (results == null || results.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(results);
    }

    @DeleteMapping("/delete/{accommodationID}")
    public void delete(@PathVariable Long accommodationID) {
        accommodationService.delete(accommodationID);
    }
}
