package co.za.cput.controller.users;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Landlord;
import co.za.cput.factory.generic.ContactFactory;
import co.za.cput.factory.user.LandlordFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.MethodName.class)
class LandLordControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private static final String BASE_URL = "http://localhost:8080/HouseConnect/Landlord";

    private static final Contact contact = ContactFactory.createContact(
            "landlord@example.com", "0721234567", "0731234567", true, false,
            Contact.PreferredContactMethod.PHONE
    );

    private static final Landlord landlord = LandlordFactory.createLandlord(
            "Kwanda", "Twalo", true,
            LocalDate.of(2024, 12, 1), "ValidPass123", contact, null
    );

    private static Landlord landlordWithId;

    @Test
    void a_create() {
        ResponseEntity<Landlord> response = restTemplate.postForEntity(BASE_URL + "/create", landlord, Landlord.class);
        assertNotNull(response.getBody());
        landlordWithId = response.getBody();
        System.out.println("Created landlord: " + landlordWithId);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read/" + landlordWithId.getLandlordID();
        ResponseEntity<Landlord> response = restTemplate.getForEntity(url, Landlord.class);
        assertNotNull(response.getBody());
        System.out.println("Read landlord: " + response.getBody());
    }

    @Test
    void c_update() {
        Landlord updated = new Landlord.Builder().copy(landlordWithId).setVerified(false).build();
        restTemplate.put(BASE_URL + "/update", updated);
        ResponseEntity<Landlord> response = restTemplate.getForEntity(BASE_URL + "/read/" + updated.getLandlordID(), Landlord.class);
        assertFalse(response.getBody().isVerified());
        System.out.println("Updated landlord: " + response.getBody());
    }

    @Test
    void d_getAllLandlords() {
        ResponseEntity<Landlord[]> response = restTemplate.getForEntity(BASE_URL + "/getAllLandlords", Landlord[].class);
        assertNotNull(response.getBody());
        System.out.println("All landlords: ");
        for (Landlord l : response.getBody()) {
            System.out.println(l);
        }
    }

    @Test
    void e_delete() {
        restTemplate.delete(BASE_URL + "/delete/" + landlordWithId.getLandlordID());
        ResponseEntity<Landlord> response = restTemplate.getForEntity(BASE_URL + "/read/" + landlordWithId.getLandlordID(), Landlord.class);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}


