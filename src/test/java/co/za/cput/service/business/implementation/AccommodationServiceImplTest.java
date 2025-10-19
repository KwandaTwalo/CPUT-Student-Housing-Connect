package co.za.cput.service.business.implementation;

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.generic.Address;
import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Landlord;
import co.za.cput.factory.business.AccommodationFactory;
import co.za.cput.factory.generic.AddressFactory;
import co.za.cput.factory.generic.ContactFactory;
import co.za.cput.factory.user.LandlordFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class AccommodationServiceImplTest {
    //THERE'S AN ERROR IN THIS CLASS CONTINUE FROM HERE/

    @Autowired
    private AccommodationServiceImpl accommodationService;

    private Address address = AddressFactory.createAddress(
            "42", "Main Street", "Observatory", "Cape Town", 7925
    );

    private final Contact landlordContact = ContactFactory.createContact(
            "thabo.nkosi@example.com",
            "0721234567",
            "0837654321",
            true,
            true,
            Contact.PreferredContactMethod.EMAIL
    );

    private final Landlord landlord = LandlordFactory.createLandlord(
            "Thabo",
            "Nkosi",
            true,
            LocalDate.now(),
            "Password123",
            landlordContact,
            Collections.emptyList()
    );

    private Accommodation accommodation1 = AccommodationFactory.createAccommodation(
            4200.00,                              // rent
            true,                                 // wifiAvailable
            true,                                 // furnished
            1.2,                                   // distanceFromCampus
            true,                                 // utilitiesIncluded
            Accommodation.RoomType.SINGLE,        // roomType
            Accommodation.BathroomType.PRIVATE,   // bathroomType
            Accommodation.AccommodationStatus.AVAILABLE,
            address,
            landlord,
            null            // bookings
    );

    private static Accommodation accommodation_with_Id;

    @Test
    void a_create() {
        Accommodation created = accommodationService.create(accommodation1);
        assertNotNull(created);
        System.out.println("Created accommodation: " + created);
        accommodation_with_Id = created;
        assertNotNull(accommodation_with_Id);
        assertNotNull(created.getLandlord());
        assertNotNull(created.getLandlord().getLandlordID());
        assertEquals(landlord.getLandlordFirstName(), created.getLandlord().getLandlordFirstName());
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void b_read() {
        assertNotNull(accommodation_with_Id);
        Accommodation read = accommodationService.read(accommodation_with_Id.getAccommodationID());
        assertNotNull(read);
        assertEquals(accommodation_with_Id.getAccommodationID(), read.getAccommodationID());
        assertNotNull(read.getLandlord());
        assertNotNull(read.getLandlord().getLandlordID());
        System.out.println("Read accommodation: " + read);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void c_update() {
        assertNotNull(accommodation_with_Id);
        Accommodation updated = new Accommodation.Builder()
                .copy(accommodation_with_Id)
                .setRent(4800.00)
                .setWifiAvailable(false)
                .setLandlord(LandlordFactory.createLandlord(
                        "Sibongile",
                        "Dlamini",
                        true,
                        LocalDate.now(),
                        "SecurePass1",
                        ContactFactory.createContact(
                                "sibongile.dlamini@example.com",
                                "0731234567",
                                "0847654321",
                                true,
                                true,
                                Contact.PreferredContactMethod.PHONE
                        ),
                        Collections.emptyList()
                ))
                .build();
        accommodationService.update(updated);

        Accommodation readAfterUpdate = accommodationService.read(updated.getAccommodationID());
        assertEquals(4800.00, readAfterUpdate.getRent());
        assertFalse(readAfterUpdate.getIsWifiAvailable());
        assertNotNull(readAfterUpdate.getLandlord());
        assertNotNull(readAfterUpdate.getLandlord().getLandlordID());
        assertEquals("Sibongile", readAfterUpdate.getLandlord().getLandlordFirstName());
        System.out.println("Updated accommodation: " + readAfterUpdate);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void d_getAll() {
        List<Accommodation> all = accommodationService.getAllAccommodations();
        assertNotNull(all);
        assertFalse(all.isEmpty());
        System.out.println("All accommodations: " + all);
    }

    @Test
    void e_delete() {
        assertNotNull(accommodation_with_Id);
        accommodationService.delete(accommodation_with_Id.getAccommodationID());
        assertNull(accommodationService.read(accommodation_with_Id.getAccommodationID()));
        System.out.println("Deleted accommodation with ID: " + accommodation_with_Id.getAccommodationID());
    }
}
