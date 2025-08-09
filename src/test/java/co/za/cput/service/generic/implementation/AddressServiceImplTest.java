package co.za.cput.service.generic.implementation;

import co.za.cput.domain.generic.Address;
import co.za.cput.factory.generic.AddressFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class AddressServiceImplTest {

    @Autowired
    private AddressServiceImpl addressService;

    private static Address address1 = AddressFactory.createAddress(
            "45A",
            "Main Street",
            "Rondebosch",
            "Cape Town",
            7700
    );


    @Test
    //@Order(1)
    void a_create() {
        Address createdAddress = addressService.create(address1);
        assertNotNull(createdAddress);
        System.out.println("Address created: " + createdAddress);
    }

    @Test
    //@Order(2)
    void b_read() {
        assertNotNull(address1);
        Address readAddress = addressService.read(address1.getAddressID());
        assertNotNull(readAddress);
        assertEquals(address1.getAddressID(), readAddress.getAddressID());
        System.out.println("Address read: " + readAddress);
    }

    @Test
    //@Order(3)
    void c_update() {
        Address updatedAddress = new Address.Builder()
                .copy(address1)
                .setStreetNumber("45B")
                .build();
        addressService.update(updatedAddress);

        //check if the Address is updated.
        Address readAddress = addressService.read(updatedAddress.getAddressID());
        System.out.println("Address read: " + readAddress);

        assertEquals(updatedAddress.getAddressID(), readAddress.getAddressID());
        assertEquals("45B", updatedAddress.getStreetNumber());
        System.out.println("Address updated: " + updatedAddress);
    }

    @Test
    //@Order(4)
    void d_getAllAddress() {
        List<Address> allAddress = addressService.getAllAddress();
        assertNotNull(allAddress);
        System.out.println("All address: " + allAddress);
    }

    @Test
    //@Order(5)
    void e_delete() {
        addressService.delete(address1.getAddressID());
        assertNull(addressService.read(address1.getAddressID()));
        System.out.println("Address deleted: " + address1);
    }
}