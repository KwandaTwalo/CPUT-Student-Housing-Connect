package co.za.cput.service.users.implementation;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import co.za.cput.domain.generic.Contact;
import co.za.cput.factory.generic.ContactFactory;
import co.za.cput.factory.user.LandlordFactory;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class LandLordServiceImplTest {

    @Autowired
    private LandLordServiceImpl landLordService;

    private static final Contact contact = ContactFactory.createContact(
            "landlord@example.com", "0721234567", "0731234567", true, false,
            Contact.PreferredContactMethod.PHONE
    );

    private static Landlord landlord = LandlordFactory.createLandlord(
            "Kwanda", "Twalo", true,
            LocalDate.of(2024, 12, 1), contact, null
    );

    private static Landlord landlordWithId;

    @Test
    void a_create() {
        Landlord created = landLordService.create(landlord);
        assertNotNull(created);
        landlordWithId = created;
        System.out.println("Created: " + created);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void b_read() {
        Landlord read = landLordService.read(landlordWithId.getLandlordID());
        assertEquals(landlordWithId.getLandlordID(), read.getLandlordID());
        System.out.println("Read: " + read);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void c_update() {
        Landlord updated = new Landlord.Builder()
                .copy(landlordWithId)
                .setVerified(false)
                .build();
        landLordService.update(updated);
        Landlord readUpdated = landLordService.read(updated.getLandlordID());
        assertFalse(readUpdated.isVerified());
        System.out.println("Updated: " + readUpdated);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void d_getAllLandlords() {
        List<Landlord> all = landLordService.getAllLandlords();
        assertNotNull(all);
        System.out.println("All landlords: " + all);
    }

    @Test
    void e_delete() {
        landLordService.delete(landlordWithId.getLandlordID());
        assertNull(landLordService.read(landlordWithId.getLandlordID()));
        System.out.println("Deleted: " + landlordWithId);
    }
}

