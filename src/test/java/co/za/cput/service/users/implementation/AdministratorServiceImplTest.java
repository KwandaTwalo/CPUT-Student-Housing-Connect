package co.za.cput.service.users.implementation;

import co.za.cput.domain.users.Administrator;
import co.za.cput.factory.user.AdministratorFactory;
import co.za.cput.service.users.IAdministratorService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class AdministratorServiceImplTest {

    @Autowired
    private static IAdministratorService service;
    private static Administrator administrator= AdministratorFactory.createAdministrator(
            "Agnes",
            "Mabusela",
            "amabusela@gmail.com",
            "0828289292",
            "admin2025");
    @Test
    void a_create() {
        Administrator created= service.create(administrator);
        assertNotNull(created);
        System.out.println(created);
    }

    @Test
    void b_read() {
        Administrator read = service.read(administrator.getAdminID());
        assertNotNull(read);
        System.out.println(read);
    }

    @Test
    void c_update() {
        Administrator newAdministrator = new Administrator.Builder().copy(administrator).setAdminName("Madikila").build();
        Administrator updated = service.update(administrator);
        assertNotNull(updated);
        System.out.println(updated);
    }

    @Test
    void e_delete() {
    }

    @Test
    void d_getAll() {
        System.out.println(service.getAll());
    }
}