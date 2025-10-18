package co.za.cput.service.business.implementation;

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.business.Booking;
import co.za.cput.dto.AccommodationInsight;
import co.za.cput.dto.AccommodationRatingSummary;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.business.BookingRepository;
import co.za.cput.repository.business.ReviewRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AccommodationInsightService {

    private final AccommodationRepository accommodationRepository;
    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;

    public AccommodationInsightService(AccommodationRepository accommodationRepository,
                                       ReviewRepository reviewRepository,
                                       BookingRepository bookingRepository) {
        this.accommodationRepository = accommodationRepository;
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
    }

    public Optional<AccommodationInsight> buildInsights(Long accommodationId) {
        if (accommodationId == null) {
            return Optional.empty();
        }

        return accommodationRepository.findById(accommodationId)
                .map(accommodation -> {
                    AccommodationRatingSummary summary = reviewRepository
                            .findSummaryByAccommodationId(accommodationId)
                            .orElse(null);
                    return buildInsight(accommodation, summary);
                });
    }

    public List<AccommodationInsight> findTopRated(int limit) {
        int size = Math.max(1, Math.min(limit, 20));
        List<AccommodationRatingSummary> summaries = reviewRepository.findTopRatedSummaries(PageRequest.of(0, size));

        List<Long> accommodationIds = summaries.stream()
                .map(AccommodationRatingSummary::accommodationId)
                .filter(Objects::nonNull)
                .toList();

        Map<Long, Accommodation> accommodationMap = accommodationRepository.findAllById(accommodationIds)
                .stream()
                .collect(Collectors.toMap(Accommodation::getAccommodationID, Function.identity()));

        return summaries.stream()
                .map(summary -> {
                    Accommodation accommodation = accommodationMap.get(summary.accommodationId());
                    if (accommodation == null) {
                        return null;
                    }
                    return buildInsight(accommodation, summary);
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private AccommodationInsight buildInsight(Accommodation accommodation, AccommodationRatingSummary summary) {
        long totalBookings = bookingRepository.countByAccommodation_AccommodationID(accommodation.getAccommodationID());
        long confirmedBookings = bookingRepository.countByAccommodation_AccommodationIDAndBookingStatus(
                accommodation.getAccommodationID(),
                Booking.BookingStatus.CONFIRMED
        );

        double occupancyRate = totalBookings == 0
                ? 0.0
                : BigDecimal.valueOf((double) confirmedBookings / totalBookings * 100.0)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();

        double averageRating = summary != null && summary.averageRating() != null
                ? BigDecimal.valueOf(summary.averageRating())
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue()
                : 0.0;

        long totalReviews = summary != null && summary.totalReviews() != null ? summary.totalReviews() : 0L;
        long positiveReviews = summary != null && summary.positiveReviewCount() != null ? summary.positiveReviewCount() : 0L;

        return new AccommodationInsight(
                accommodation.getAccommodationID(),
                accommodation.getAccommodationStatus(),
                averageRating,
                totalReviews,
                positiveReviews,
                summary != null ? summary.mostRecentReviewDate() : null,
                confirmedBookings,
                totalBookings,
                occupancyRate,
                accommodation.getRent(),
                accommodation.getIsWifiAvailable(),
                accommodation.getIsFurnished(),
                accommodation.getIsUtilitiesIncluded(),
                accommodation.getDistanceFromCampus(),
                accommodation.getAddress() != null ? accommodation.getAddress().getSuburb() : null,
                accommodation.getAddress() != null ? accommodation.getAddress().getCity() : null
        );
    }
}