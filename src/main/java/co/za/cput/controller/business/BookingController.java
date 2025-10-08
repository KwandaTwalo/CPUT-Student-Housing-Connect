package co.za.cput.controller.business;

import co.za.cput.domain.business.Booking;
import co.za.cput.service.business.implementation.BookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/HouseConnect/Booking")
public class BookingController {

    private final BookingServiceImpl bookingService;

    @Autowired
    public BookingController(BookingServiceImpl bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public ResponseEntity<Booking> create(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.create(booking);
        return ResponseEntity.ok(createdBooking);
    }

    @GetMapping("/read/{bookingID}")
    public ResponseEntity<Booking> read(@PathVariable Long bookingID) {
        Booking booking = bookingService.read(bookingID);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/update")
    public ResponseEntity<Booking> update(@RequestBody Booking booking) {
        if (booking.getBookingID() == null) {
            return ResponseEntity.badRequest().build();
        }
        Booking updatedBooking = bookingService.update(booking);
        if (updatedBooking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedBooking);
    }

    @GetMapping("/getAllBookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        if (bookings == null || bookings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/delete/{bookingID}")
    public void delete(@PathVariable Long bookingID) {
        bookingService.delete(bookingID);
    }
}
