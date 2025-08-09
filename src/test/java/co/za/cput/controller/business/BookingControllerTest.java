package co.za.cput.controller.business;

import co.za.cput.domain.business.Booking;
import co.za.cput.factory.business.BookingFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.MethodName.class)
class BookingControllerTest {

    private static final String BASE_URL = "http://localhost:8080/HouseConnect/Booking";

    private Booking booking1 = BookingFactory.createBooking(
            LocalDate.of(2025, 5, 15),
            LocalDate.of(2025, 6, 1),
            LocalDate.of(2025, 12, 15),
            6500.00,
            LocalDateTime.of(2025, 5, 16, 9, 19, 54),
            LocalDateTime.of(2025, 6, 1, 9, 15, 47),
            Booking.PaymentStatus.PAID,
            Booking.BookingStatus.CONFIRMED,
            null,
            null,
            null
    );

    private static Booking booking_with_ID;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<Booking> createResponse = this.restTemplate.postForEntity(url, booking1, Booking.class);
        assertNotNull(createResponse.getBody());
        System.out.println("Created booking: " + createResponse.getBody());
        booking_with_ID = createResponse.getBody();
        assertNotNull(booking_with_ID);
    }

    @Test
    void b_read() {
        assertNotNull(booking_with_ID);
        String url = BASE_URL + "/read/" + booking_with_ID.getBookingID();
        ResponseEntity<Booking> readResponse = this.restTemplate.getForEntity(url, Booking.class);
        assertNotNull(readResponse.getBody());
        System.out.println("Read booking: " + readResponse.getBody());
    }

    @Test
    void c_update() {
        assertNotNull(booking_with_ID);
        String url = BASE_URL + "/update";

        Booking updatedBooking = new Booking.Builder()
                .copy(booking_with_ID)
                .setTotalAmount(9500.00)
                .setBookingStatus(Booking.BookingStatus.IN_PROGRESS)
                .setUpdatedAt(LocalDateTime.of(2025, 7, 15, 10, 30, 0))
                .build();

        this.restTemplate.put(url, updatedBooking);

        ResponseEntity<Booking> readResponse =
                this.restTemplate.getForEntity(BASE_URL + "/read/" + updatedBooking.getBookingID(), Booking.class);
        assertNotNull(readResponse.getBody());

        System.out.println("Read booking after update: " + readResponse.getBody());

        assertEquals(9500.00, readResponse.getBody().getTotalAmount());
        assertEquals(Booking.BookingStatus.IN_PROGRESS, readResponse.getBody().getBookingStatus());
        assertEquals(LocalDateTime.of(2025, 7, 15, 10, 30, 0), readResponse.getBody().getUpdatedAt());
    }

    @Test
    void d_getAllBookings() {
        String url = BASE_URL + "/getAllBookings";
        ResponseEntity<Booking[]> response = this.restTemplate.getForEntity(url, Booking[].class);
        assertNotNull(response.getBody());

        System.out.println("All bookings:");
        for (Booking booking : response.getBody()) {
            System.out.println(booking);
        }
    }

    @Test
    void e_delete() {
        assertNotNull(booking_with_ID);
        String url = BASE_URL + "/delete/" + booking_with_ID.getBookingID();
        this.restTemplate.delete(url);

        ResponseEntity<Booking> readResponse =
                this.restTemplate.getForEntity(BASE_URL + "/read/" + booking_with_ID.getBookingID(), Booking.class);
        assertEquals(HttpStatus.NOT_FOUND, readResponse.getStatusCode());
        System.out.println("Booking successfully deleted. Status code: " + readResponse.getStatusCode());
    }
}
