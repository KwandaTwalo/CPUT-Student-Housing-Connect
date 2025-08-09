package co.za.cput.factory.user;

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Administrator;
import co.za.cput.factory.generic.ContactFactory;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class AdministratorFactoryTest {

    private  Contact contact1 = ContactFactory.createContact(
            "Abigail@yahoo.com",
            "0712345678",
            "0723456789",
            true,
            true,
            Contact.PreferredContactMethod.EMAIL
    );

    private Administrator admin = AdministratorFactory.createAdministrator(
            "Kwanda",
            "Twalo",
            "AdminPass123",                  // Password (must meet validation)
            Administrator.AdminRoleStatus.ACTIVE,
            contact1,
            null
    );

    @Test
    void createAdministrator() {
        assertNotNull(admin);
        System.out.println("Created Administrator: " + admin);
    }

    @Test
    void testInvalidPassword() {
        Administrator invalidAdmin = AdministratorFactory.createAdministrator(
                "Lindiwe",
                "Ngcobo",
                "1234", // invalid: too short, no letters
                Administrator.AdminRoleStatus.ACTIVE,
                contact1,
                null
        );
        assertNull(invalidAdmin, "Factory should return null for invalid password");
        System.out.println("Invalid password admin: " + invalidAdmin);
    }

}