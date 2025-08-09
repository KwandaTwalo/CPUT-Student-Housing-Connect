package co.za.cput.factory.generic;

import co.za.cput.domain.generic.Contact;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContactFactoryTest {

    private static Contact contact1 = ContactFactory.createContact(
            "Abigail@yahoo.com",
            "0712345678",
            "0723456789",
            true,
            true,
            Contact.PreferredContactMethod.EMAIL
    );


    @Test
    void createContact() {
        assertNotNull(contact1);
        System.out.println("createContact: " + contact1);
    }

    @Test
    void checkInValidEmail() {
        Contact contact2 = ContactFactory.createContact(
                "Abigailyahoo.com",
                "0712345678",
                "0723456789",
                true,
                true,
                Contact.PreferredContactMethod.EMAIL
        );

        assertNull(contact2);
        System.out.println("checkInValidEmail: " + contact2);
    }

    @Test
    void checkInValidPhone() {
        Contact contact3 = ContactFactory.createContact(
                "Abigail@yahoo.com",
                "+2771234567",//less than 10 values (Invalid).
                "0723456789",
                true,
                true,
                Contact.PreferredContactMethod.EMAIL
        );
        assertNull(contact3);
        System.out.println("checkInValidPhone: " + contact3);
    }
}