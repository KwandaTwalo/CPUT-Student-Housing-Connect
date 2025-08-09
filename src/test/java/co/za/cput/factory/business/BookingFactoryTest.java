package co.za.cput.factory.business;

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.business.Booking;
import co.za.cput.domain.business.Review;
import co.za.cput.domain.generic.Address;
import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Student;
import co.za.cput.factory.generic.AddressFactory;
import co.za.cput.factory.generic.ContactFactory;
import co.za.cput.factory.user.StudentFactory;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class BookingFactoryTest {

    LocalDate requestDate = LocalDate.of(2025, 6, 28);
    LocalDate checkInDate = LocalDate.of(2025, 7, 1);
    LocalDate checkOutDate = LocalDate.of(2025, 7, 30);
    double totalAmount = 4500.00;
    LocalDateTime createdAt = LocalDateTime.now();
    LocalDateTime updatedAt = LocalDateTime.now();

    private Booking booking1 = BookingFactory.createBooking(
            requestDate,
            checkInDate,
            checkOutDate,
            totalAmount,
            createdAt,
            updatedAt,
            Booking.PaymentStatus.PENDING,
            Booking.BookingStatus.CONFIRMED,
            null,
            null,   // Accommodation excluded
            null    // Review excluded
    );


    @Test
    void createBooking() {
        assertNotNull(booking1);
        System.out.println("booking1 = " + booking1);
    }

    @Test
    void checkInvalid_CheckOutDate() {
        // checkOutDate is in the future → invalid
        Booking booking2 = BookingFactory.createBooking(
                LocalDate.of(2025, 6, 28),
                LocalDate.of(2025, 7, 1),
                LocalDate.of(2026, 12, 31),
                4500.00,
                LocalDateTime.now().minusDays(2),
                LocalDateTime.now(),
                Booking.PaymentStatus.PENDING,
                Booking.BookingStatus.CONFIRMED,
                null,
                null,
                null
        );
        assertNotNull(booking2, "Check-out date can be any date (past or future)");
        System.out.println("booking2 = " + booking2);
    }

    @Test
    void checkInvalid_CreatedAt() {
        // createdAt is in the future → invalid
        Booking booking3 = BookingFactory.createBooking(
                LocalDate.of(2025, 6, 28),
                LocalDate.of(2025, 7, 1),
                LocalDate.of(2025, 7, 30),
                4500.00,
                LocalDateTime.now().plusDays(3),
                LocalDateTime.now(),
                Booking.PaymentStatus.PENDING,
                Booking.BookingStatus.CONFIRMED,
                null,
                null,
                null
        );
        assertNull(booking3, "CreatedAt date is in the future");
        System.out.println("booking3 = " + booking3);
    }

    @Test
    void checkInvalid_TotalAmount() {
        // totalAmount is negative → invalid
        Booking booking4 = BookingFactory.createBooking(
                LocalDate.of(2025, 6, 28),
                LocalDate.of(2025, 7, 1),
                LocalDate.of(2025, 7, 30),
                -1000.00,
                LocalDateTime.now().minusDays(2),
                LocalDateTime.now(),
                Booking.PaymentStatus.PENDING,
                Booking.BookingStatus.CONFIRMED,
                null,
                null,
                null
        );

        assertNull(booking4, "Total amount should not be negative");
        System.out.println("booking4 = " + booking4);
    }
}
