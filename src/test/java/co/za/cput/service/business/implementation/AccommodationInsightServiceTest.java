package co.za.cput.service.business.implementation;

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.business.Booking;
import co.za.cput.domain.generic.Address;
import co.za.cput.dto.AccommodationInsight;
import co.za.cput.dto.AccommodationRatingSummary;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.business.BookingRepository;
import co.za.cput.repository.business.ReviewRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccommodationInsightServiceTest {

    @Mock
    private AccommodationRepository accommodationRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private AccommodationInsightService service;

    @Test
    void buildInsightsReturnsAggregatedData() {
        Accommodation accommodation = new Accommodation.Builder()
                .setAccommodationID(1L)
                .setAccommodationStatus(Accommodation.AccommodationStatus.AVAILABLE)
                .setRent(4200)
                .setWifiAvailable(true)
                .setFurnished(true)
                .setUtilitiesIncluded(false)
                .setDistanceFromCampus(1.5)
                .setAddress(new Address.Builder()
                        .setCity("Cape Town")
                        .setSuburb("Belhar")
                        .build())
                .build();

        AccommodationRatingSummary summary = new AccommodationRatingSummary(
                1L,
                4.55,
                12L,
                LocalDate.of(2024, 8, 20),
                9L
        );

        when(accommodationRepository.findById(1L)).thenReturn(Optional.of(accommodation));
        when(reviewRepository.findSummaryByAccommodationId(1L)).thenReturn(Optional.of(summary));
        when(bookingRepository.countByAccommodation_AccommodationID(1L)).thenReturn(6L);
        when(bookingRepository.countByAccommodation_AccommodationIDAndBookingStatus(1L, Booking.BookingStatus.CONFIRMED))
                .thenReturn(4L);

        Optional<AccommodationInsight> result = service.buildInsights(1L);

        assertTrue(result.isPresent());
        AccommodationInsight insight = result.orElseThrow();
        assertEquals(1L, insight.accommodationId());
        assertEquals(Accommodation.AccommodationStatus.AVAILABLE, insight.status());
        assertEquals(4.55, insight.averageRating(), 0.001);
        assertEquals(12, insight.totalReviews());
        assertEquals(9, insight.positiveReviews());
        assertEquals(LocalDate.of(2024, 8, 20), insight.mostRecentReviewDate());
        assertEquals(4, insight.confirmedBookings());
        assertEquals(6, insight.totalBookings());
        assertEquals(66.67, insight.occupancyRate(), 0.001);
        assertEquals("Cape Town", insight.city());
        assertEquals("Belhar", insight.suburb());
    }

    @Test
    void findTopRatedSanitizesLimitBeforeQuery() {
        when(reviewRepository.findTopRatedSummaries(any(PageRequest.class))).thenReturn(List.of());
        when(accommodationRepository.findAllById(any())).thenReturn(List.of());

        service.findTopRated(-10);

        verify(reviewRepository).findTopRatedSummaries(eq(PageRequest.of(0, 1)));
    }
}