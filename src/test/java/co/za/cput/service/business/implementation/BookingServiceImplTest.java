package co.za.cput.service.business.implementation;

import co.za.cput.domain.business.Booking;
import co.za.cput.factory.business.BookingFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class BookingServiceImplTest {

    @Autowired
    private BookingServiceImpl bookingService;

    private Booking booking1 = BookingFactory.createBooking(
            LocalDate.of(2025, 5, 15),
            LocalDate.of(2025, 6, 1),
            LocalDate.of(2025, 12, 15),
            8500.00,
            LocalDateTime.now().minusDays(30),
            LocalDateTime.now().minusDays(10),
            Booking.PaymentStatus.PARTIALLY_PAID,
            Booking.BookingStatus.IN_PROGRESS,
            null,
            null,
            null
    );

    private static Booking booking_with_ID;

    @Test
    void a_create() {
        Booking createdBooking = bookingService.create(booking1);
        assertNotNull(createdBooking);
        booking_with_ID = createdBooking;
        System.out.println("Created booking: " + booking_with_ID);
    }

    @Test
    void b_read() {
        assertNotNull(booking_with_ID);
        Booking readBooking = bookingService.read(booking_with_ID.getBookingID());
        assertNotNull(readBooking);
        assertEquals(booking_with_ID.getBookingID(), readBooking.getBookingID());
        System.out.println("Read booking: " + readBooking);
    }

    @Test
    void c_update() {
        assertNotNull(booking_with_ID);
        Booking updatedBooking = new Booking.Builder()
                .copy(booking_with_ID)
                .setTotalAmount(9200.00)
                .setPaymentStatus(Booking.PaymentStatus.PAID)
                .setBookingStatus(Booking.BookingStatus.CONFIRMED)
                .build();

        bookingService.update(updatedBooking);

        Booking readBooking = bookingService.read(updatedBooking.getBookingID());
        assertNotNull(readBooking);
        assertEquals(9200.00, updatedBooking.getTotalAmount());
        assertEquals(Booking.PaymentStatus.PAID, updatedBooking.getPaymentStatus());
        assertEquals(Booking.BookingStatus.CONFIRMED, updatedBooking.getBookingStatus());
        System.out.println("Updated booking: " + updatedBooking);
    }

    @Test
    void d_getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        assertNotNull(bookings);
        System.out.println("All bookings: ");
        bookings.forEach(System.out::println);
    }

    @Test
    void e_delete() {
        assertNotNull(booking_with_ID);
        bookingService.delete(booking_with_ID.getBookingID());
        Booking deletedBooking = bookingService.read(booking_with_ID.getBookingID());
        assertNull(deletedBooking);
        System.out.println("Booking deleted: " + booking_with_ID);
    }
}
