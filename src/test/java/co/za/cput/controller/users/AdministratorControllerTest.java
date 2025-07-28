package co.za.cput.controller.users;

import co.za.cput.domain.users.Administrator;
import co.za.cput.factory.user.AdministratorFactory;
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
class AdministratorControllerTest {

    private static Administrator administrator;

    @Autowired
    private TestRestTemplate restTemplate;
    private  static final String BASE_URL = "http://localhost:8080/CPUTstudenthousingconnect/customer";

    @BeforeAll
    static void setUp() throws Exception {

        administrator = AdministratorFactory.createAdministrator(
                "Agnes",
                "Mabusela",
                "agnes@gmail.com",
                "0817281929",
                "password123"
                );

    }
    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<Administrator> postResponse = restTemplate.postForEntity(url, administrator, Administrator.class);
        assertNotNull(postResponse);
        Administrator administratorSaved = postResponse.getBody();
        assertEquals(administrator.getAdminID(), administratorSaved.getAdminID());
        System.out.println("Created: "+ administratorSaved);
    }

    @Test
    void b_read() {
        String url = BASE_URL + "/read" + administrator.getAdminID();
        ResponseEntity<Administrator> response = this.restTemplate.getForEntity(url, Administrator.class);
        assertNotEquals(administrator.getAdminID(), response.getBody().getAdminID());
        System.out.println("Read: "+ response.getBody());
    }

    @Test
    void update() {
        Administrator updatedCustomer = new Administrator.Builder().copy(administrator).setAdminName("Madikila").build();
        String url = BASE_URL + "/update";
        ResponseEntity<Administrator> response = this.restTemplate.postForEntity(url, updatedCustomer, Administrator.class);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(updatedCustomer.getAdminName(), response.getBody().getAdminName());
        System.out.println("Updated: "+ response.getBody());
    }

    @Test
    void delete() {
        String url = BASE_URL + "/delete" + administrator.getAdminID();
        this.restTemplate.delete(url);

        ResponseEntity<Administrator> response = this.restTemplate.getForEntity(BASE_URL+"/read/"+administrator.getAdminID(), Administrator.class);
        assertNull(response.getBody());
        System.out.println("Deleted: "+ response.getBody());
    }

    @Test
    void getAll() {
        String url = BASE_URL + "/getAll";
        ResponseEntity<Administrator[]> response = this.restTemplate.getForEntity(url, Administrator[].class);
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length>0);
        System.out.println("GetAll: ");
        for (Administrator administrator : response.getBody()) {
            System.out.println(administrator);
        }

    }
}