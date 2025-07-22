package co.za.cput.factory.business;

import co.za.cput.domain.business.Booking;
import co.za.cput.util.Helper;
import java.util.Date;
import java.util.UUID;

public class BookingFactory {
    public static Booking createBooking(Date requestDate, Booking.BookingStatus bookingStatus) {

        if (!Helper.validateRequestDate(requestDate)) {
            return null;
        }

        return new Booking.Builder()
                .setRequestDate(requestDate)
                .setStatus(bookingStatus)
                .build();


    }
}
