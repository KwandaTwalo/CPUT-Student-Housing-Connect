package co.za.cput.controller.users;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import co.za.cput.factory.user.LandlordFactory;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.MethodName.class)
class LandlordControllerTest {

    private static Landlord landlord;

    @Autowired
    private TestRestTemplate restTemplate;
    private static final String BASE_URL = "http://localhost:8080/CPUTstudenthousingconnect/customer";


    @BeforeAll
    static void setUp() throws Exception {

        landlord = LandlordFactory.createLandlord(
                "Sinhle",
                "Mthethwa"
                );
}
@Test
void a_create() {
    String url = BASE_URL + "/create";
    ResponseEntity<Landlord> postResponse = restTemplate.postForEntity(url, landlord, Landlord.class);
    assertNotNull(postResponse);
    Landlord landlordSaved = postResponse.getBoy();
    assertEquals(landlord.getLandlordID(), landlordSaved.getLandlordID());
    system.out.println("Create: "+ landlordSaved);
    }
   @Test
   void b_read() {
        String url = BASE_URL + "/read" + landlord.getLandlordID();
        ResponseEntity<Landlord> response = this.restTemplate.getForEntity(url, Landlord.class);
        assertNotEquals(landlord.getLandlordID(), response.getBody().getLandlordID());
        system.out.println("Read "+ response.getBody());
   }

   @Test
   void update() {
        Landlord updateAccomodation = new Landlord.Builder().copy(landlord).build();
        String url = BASE_URL + "/update";
        ResponseEntity<Landlord> response = this.restTemplate.postForEntity(url, Landlord.class);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(updateAccomodation.getLandlordFirstName(), response.getBody().getLandlordFirstName());
        System.out.println("Update: "+ response.getBody());
   }

@Test
    void delete() {
        String url = BASE_URL + "/delete"+landlord.getLandlordID();
        this.restTemplate.delete(url);

        responseEntity<Landlord> response = this.restTemplate.getEntity(BASE_URL+"/read/"+ landlord.getLandlordID(), Landlord.class );
        assertNull(response.getBody());
        system.out.println("Deleted: "+response.getBody());
}
@Test
    void getAll() {
        ResponseEntity<Landlord[]> response = this.restTemplate.getForEntity(url, Landlord[].class);
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length>0);
        System.out.println("GetAll: ");
        for (Landlord landlord1 : response.getBody()) {
            System.out.println(landlord);
        }
}

}



