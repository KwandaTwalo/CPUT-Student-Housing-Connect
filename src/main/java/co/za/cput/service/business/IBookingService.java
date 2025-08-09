package co.za.cput.service.business;

import co.za.cput.domain.business.Booking;
import co.za.cput.service.IService;

import java.util.List;

public interface IBookingService extends IService<Booking, Long> {
    List<Booking> getAllBookings();
}
