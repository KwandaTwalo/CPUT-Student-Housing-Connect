package co.za.cput.service.analytics;

import co.za.cput.domain.business.Booking;
import co.za.cput.domain.business.Verification;
import co.za.cput.dto.AdminDashboardStats;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.business.BookingRepository;
import co.za.cput.repository.business.VerificationRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.repository.users.StudentRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
public class AdminDashboardService {

    private final StudentRepository studentRepository;
    private final LandLordRepository landLordRepository;
    private final AccommodationRepository accommodationRepository;
    private final VerificationRepository verificationRepository;
    private final BookingRepository bookingRepository;

    public AdminDashboardService(StudentRepository studentRepository,
                                 LandLordRepository landLordRepository,
                                 AccommodationRepository accommodationRepository,
                                 VerificationRepository verificationRepository,
                                 BookingRepository bookingRepository) {
        this.studentRepository = studentRepository;
        this.landLordRepository = landLordRepository;
        this.accommodationRepository = accommodationRepository;
        this.verificationRepository = verificationRepository;
        this.bookingRepository = bookingRepository;
    }

    public AdminDashboardStats buildOverview() {
        long totalStudents = studentRepository.count();
        long totalLandlords = landLordRepository.count();
        long verifiedLandlords = landLordRepository.countByIsVerifiedTrue();
        long totalAccommodations = accommodationRepository.count();
        long pendingVerifications = verificationRepository.countByVerificationStatus(Verification.VerificationStatus.PENDING);
        long activeBookings = bookingRepository.countByBookingStatus(Booking.BookingStatus.CONFIRMED);

        double occupancyRate = computeOccupancyRate(activeBookings, totalAccommodations);

        return new AdminDashboardStats(
                totalStudents,
                totalLandlords,
                verifiedLandlords,
                totalAccommodations,
                pendingVerifications,
                activeBookings,
                occupancyRate,
                LocalDateTime.now()
        );
    }

    private double computeOccupancyRate(long activeBookings, long totalAccommodations) {
        if (totalAccommodations == 0) {
            return 0.0;
        }

        double rate = (double) activeBookings / totalAccommodations * 100.0;
        return BigDecimal.valueOf(rate)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}