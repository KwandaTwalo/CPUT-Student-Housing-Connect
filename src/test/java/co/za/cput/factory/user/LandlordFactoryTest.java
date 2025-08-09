package co.za.cput.factory.user;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Landlord;
import co.za.cput.factory.generic.ContactFactory;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class LandlordFactoryTest {

    private static final Contact contact = ContactFactory.createContact(
            "landlord@example.com",
            "0721234567",
            "0731234567",
            true,
            false,
            Contact.PreferredContactMethod.PHONE
    );

    // Landlord object with only attributes
    private static Landlord landlord = LandlordFactory.createLandlord(
            "Kwanda",
            "Twalo",
            true,
            LocalDate.of(2024, 12, 1),
            "ValidPass123",
            contact,
            null
    );

    @Test
    void createLandlord() {
        assertNotNull(landlord);
        System.out.println("Created Landlord: " + landlord);
    }

    @Test
    void testInvalidDateRegistered() {
        // date in the future (invalid)
        LocalDate futureDate = LocalDate.now().plusDays(5);

        Landlord landlord = LandlordFactory.createLandlord(
                "John",
                "Doe",
                true,
                futureDate,
                "ValidPass123",
                contact,
                Collections.emptyList()
        );

        assertNull(landlord);
        System.out.println("Landlord should be null due to invalid dateRegistered: " + landlord);
    }

    @Test
    void testInvalidPassword() {
        // password without digits or too short (invalid)
        String invalidPassword = "short";

        Landlord landlord = LandlordFactory.createLandlord(
                "Jane",
                "Smith",
                true,
                LocalDate.of(2023, 10, 1),
                invalidPassword,
                contact,
                null
        );

        assertNull(landlord);
        System.out.println("Landlord should be null due to invalid password: " + landlord);
    }
}

