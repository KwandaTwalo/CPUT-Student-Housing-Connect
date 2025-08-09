package co.za.cput.service.generic.implementation;

import co.za.cput.domain.generic.Contact;
import co.za.cput.factory.generic.ContactFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class ContactServiceImplTest {

    @Autowired
    private ContactServiceImpl contactService;

    private static Contact contact1 = ContactFactory.createContact(
            "lindiwe@gmail.com",              // valid email
            "0734567890",                     // valid phone
            "+27745678901",                     // valid alternate phone
            false,                            // email not verified
            true,                             // phone verified
            Contact.PreferredContactMethod.PHONE
    );

    @Test
    void a_create() {
        Contact createdContact =contactService.create(contact1);
        assertNotNull(createdContact);
        System.out.println("Contact created: " + createdContact);
    }

    @Test
    void b_read() {
        Contact readContact = contactService.read(contact1.getContactID());
        assertNotNull(readContact);
        assertEquals(contact1.getContactID(), readContact.getContactID());
        System.out.println("Contact read: " + readContact);
    }

    @Test
    void c_update() {
        Contact updatedContact = new Contact.Builder()
                .copy(contact1)
                .setEmail("Lindiwe32@cput.ac.za")
                .build();
        contactService.update(updatedContact);

        //verify if the object is updated.
        Contact readContact = contactService.read(updatedContact.getContactID());
        System.out.println("Contact updated: " + readContact);

        assertEquals(updatedContact.getContactID(), readContact.getContactID());
        assertEquals("Lindiwe32@cput.ac.za", updatedContact.getEmail());
        System.out.println("Contact read: " + updatedContact);
    }

    @Test
    void d_getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        assertNotNull(contacts);
        System.out.println("Contacts list: " + contacts);
    }

    @Test
    void e_delete() {
        /*contactService.delete(contact1.getContactID());
        assertNull(contactService.read(contact1.getContactID()));
        System.out.println("Contact deleted: " + contact1);*/
    }
}