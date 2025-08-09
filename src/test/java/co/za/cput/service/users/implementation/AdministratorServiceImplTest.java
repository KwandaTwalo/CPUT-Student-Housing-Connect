package co.za.cput.service.users.implementation;

import co.za.cput.domain.users.Administrator;
import co.za.cput.domain.generic.Contact;
import co.za.cput.factory.generic.ContactFactory;
import co.za.cput.factory.user.AdministratorFactory;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)

class AdministratorServiceImplTest {

    @Autowired
    private AdministratorServiceImpl administratorService;

    private static final Contact contact = ContactFactory.createContact(
            "admin@gmail.com", "0821234567", "0832345678", true, true,
            Contact.PreferredContactMethod.EMAIL
    );

    private static Administrator administrator = AdministratorFactory.createAdministrator(
            "Kwanda", "Twalo", "StrongPass123", Administrator.AdminRoleStatus.ACTIVE, contact, null
    );

    private static Administrator adminWithId;

    @Test
    void a_create() {
        Administrator created = administratorService.create(administrator);
        assertNotNull(created);
        adminWithId = created;
        System.out.println("Created: " + created);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void b_read() {
        assertNotNull(adminWithId);
        Administrator read = administratorService.read(adminWithId.getAdminID());
        assertEquals(adminWithId.getAdminID(), read.getAdminID());
        System.out.println("Read: " + read);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void c_update() {
        Administrator updated = new Administrator.Builder()
                .copy(adminWithId)
                .setAdminRoleStatus(Administrator.AdminRoleStatus.INACTIVE)
                .build();
        administratorService.update(updated);
        Administrator readUpdated = administratorService.read(updated.getAdminID());
        assertEquals(Administrator.AdminRoleStatus.INACTIVE, readUpdated.getAdminRoleStatus());
        System.out.println("Updated: " + readUpdated);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void d_getAllAdministrators() {
        List<Administrator> all = administratorService.getAllAdministrators();
        assertNotNull(all);
        System.out.println("All admins: " + all);
    }

    @Test
    void e_delete() {
        administratorService.delete(adminWithId.getAdminID());
        assertNull(administratorService.read(adminWithId.getAdminID()));
        System.out.println("Deleted: " + adminWithId);
    }
}
