package co.za.cput.factory.user;

import co.za.cput.domain.users.Administrator;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AdministratorFactoryTest {

    private static Administrator factory1 = AdministratorFactory.createAdministrator(
            "Agnes",
            "Mabusela",
            "amabusela@gmail.com",
            "0728382738",
            "pass2025d");

    private static Administrator factory2 = AdministratorFactory.createAdministrator(
            "Agnes",
            "Mabusela",
            "amabuselagmail.com",
            "0728382738",
            "pass2025d");

    @Test
    @Order(1)
    public void testCreateAdministrator1() {
        assertNotNull(factory1);
        System.out.println(factory1.toString());
    }

    @Test
    @Order(2)
    public void testCreateAdministrator2() {
        assertNotNull(factory2);
        System.out.println(factory2.toString());
    }

  
}