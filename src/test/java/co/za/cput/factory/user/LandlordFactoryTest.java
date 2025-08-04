package co.za.cput.factory.user;

import co.za.cput.domain.users.Landlord;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

class LandlordFactoryTest {

    private static LandlordFactory factory1 = LandlordFactory.createLandlord(
            "Sinhle",
            "Mthethwa");


    private static LandlordFactory factory2 = LandlordFactory.createLandlord(
            "Sinhle",
            "Mthethwa");

    @Test
    @Order(1)
    public void testCreateLandlord1 () {
        assertNotNull(factory1);
        System.out.println(factory1.toString());
    }
    @Test
    @Order(2)
    public void testCreateLandlord1 () {
        assertNotNull(factory2);
        System.out.println(factory2.toString());
    }

}
