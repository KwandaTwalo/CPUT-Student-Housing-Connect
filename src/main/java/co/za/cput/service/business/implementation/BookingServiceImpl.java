package co.za.cput.service.business.implementation;

import co.za.cput.domain.business.Booking;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.business.BookingRepository;
import co.za.cput.repository.users.StudentRepository;
import co.za.cput.service.business.IBookingService;
import co.za.cput.util.LinkingEntitiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements IBookingService {

    private BookingRepository bookingRepository;
    private StudentRepository studentRepository;
    private AccommodationRepository accommodationRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                              StudentRepository studentRepository,
                              AccommodationRepository accommodationRepository) {
        this.bookingRepository = bookingRepository;
        this.studentRepository = studentRepository;
        this.accommodationRepository = accommodationRepository;
    }

    @Override
    public Booking create(Booking booking) {
        // Prepare booking with persisted linked entities (student, accommodation)
        Booking preparedBooking = LinkingEntitiesHelper.prepareBookingWithLinkedEntities(
                booking, studentRepository, accommodationRepository);

        // Link the booking inside the review (if review exists)
        preparedBooking = LinkingEntitiesHelper.setBookingInReview(preparedBooking);

        // Save booking
        return bookingRepository.save(preparedBooking);
    }

    @Override
    public Booking read(Long Id) {
        return bookingRepository.findById(Id).orElse(null);
    }

    @Override
    public Booking update(Booking booking) {
        if (booking.getBookingID() == null || !bookingRepository.existsById(booking.getBookingID())) {
            return null; // or throw exception if preferred
        }

        // Prepare booking with persisted linked entities (student, accommodation)
        Booking preparedBooking = LinkingEntitiesHelper.prepareBookingWithLinkedEntities(
                booking, studentRepository, accommodationRepository);

        // Link the booking inside the review (if review exists)
        preparedBooking = LinkingEntitiesHelper.setBookingInReview(preparedBooking);

        // Save updated booking
        return bookingRepository.save(preparedBooking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void delete(Long Id) {
        bookingRepository.deleteById(Id);
    }
}
