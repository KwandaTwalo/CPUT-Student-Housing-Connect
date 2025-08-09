package co.za.cput.factory.generic;

import co.za.cput.domain.generic.Address;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AddressFactoryTest {

    private Address address1 = AddressFactory.createAddress(
            "12B",
            "Durban Road",
            "Bellville",
            "Cape Town",
            7530
    );

    @Test
    void createAddress() {
        assertNotNull(address1);
        System.out.println("created Address: " + address1);
    }

    @Test
    void NotValid_PostalCode() {
        Address address2 = AddressFactory.createAddress(
                "12B",
                "Durban Road",
                "Bellville",
                "Cape Town",
                75301
        );
        assertNull(address2);
        System.out.println("isNotValid_PostalCode: " + address2);
    }

    @Test
    void emptyField() {
        Address address3 = AddressFactory.createAddress(
                "12B",
                "Durban Road",
                "",
                "Cape Town",
                7530
        );
        assertNull(address3);
        System.out.println("Empty suburb: " + address3);
    }


}