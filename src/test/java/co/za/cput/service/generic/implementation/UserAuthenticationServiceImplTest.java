package co.za.cput.service.generic.implementation;

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.generic.UserAuthentication;
import co.za.cput.factory.generic.ContactFactory;
import co.za.cput.factory.generic.UserAuthenticationFactory;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class UserAuthenticationServiceImplTest {

    @Autowired
    private UserAuthenticationServiceImpl userAuthenticationService;

    private static final Contact contact = ContactFactory.createContact(
            "Abigail@yahoo.com",
            "0712345678",
            "0723456789",
            true,
            true,
            Contact.PreferredContactMethod.EMAIL
    );

    private static final UserAuthentication userAuthentication = UserAuthenticationFactory.createUserAuthentication(
            "Abi@123",
            "student123", // Normally hashed before saving
            UserAuthentication.UserRole.STUDENT,
            contact,
            null,   // student is null for now
            null,   // landlord is null
            null    // admin is null
    );

    private static UserAuthentication authWithId;

    @Test
    void a_create() {
        UserAuthentication created = userAuthenticationService.create(userAuthentication);
        assertNotNull(created);
        authWithId = created;
        System.out.println("Created: " + created);
    }

    @Test
    @Transactional
    void b_read() {
        assertNotNull(authWithId);
        UserAuthentication read = userAuthenticationService.read(authWithId.getAuthenticationId());
        assertEquals(authWithId.getAuthenticationId(), read.getAuthenticationId());
        System.out.println("Read: " + read);
    }

    @Test
    @Transactional
    void c_update() {
        UserAuthentication updated = new UserAuthentication.Builder()
                .copy(authWithId)
                .setUsername("AbiUpdated") // update username for testing
                .build();
        userAuthenticationService.update(updated);
        UserAuthentication readUpdated = userAuthenticationService.read(updated.getAuthenticationId());
        assertEquals("AbiUpdated", readUpdated.getUsername());
        System.out.println("Updated: " + readUpdated);
    }

    @Test
    @Transactional
    void d_getAllUserAuthentications() {
        List<UserAuthentication> all = userAuthenticationService.getAllUserAuthentications();
        assertNotNull(all);
        System.out.println("All UserAuthentications: " + all);
    }

    @Test
    void e_delete() {
        userAuthenticationService.delete(authWithId.getAuthenticationId());
        assertNull(userAuthenticationService.read(authWithId.getAuthenticationId()));
        System.out.println("Deleted: " + authWithId);
    }
}
