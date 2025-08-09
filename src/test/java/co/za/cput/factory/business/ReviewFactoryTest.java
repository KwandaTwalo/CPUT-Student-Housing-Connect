package co.za.cput.factory.business;

import co.za.cput.domain.business.Booking;
import co.za.cput.domain.business.Review;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class ReviewFactoryTest {

    Booking mockBooking = mock(Booking.class);

    private Review review1 = ReviewFactory.createReview(
            5, // rating
            "Everything was perfect! Highly recommended.",
            LocalDate.now(),
            null
    );

    @Test
    void createReview() {
        assertNotNull(review1);
        System.out.println("Review created: " + review1);
    }

    @Test
    void check_inValidRating() {
        Review review2 = ReviewFactory.createReview(
                0,
                "I don't recommend anyone on that place",
                LocalDate.now(),
                null
        );
        assertNull(review2, "Expected to be null because the rating is zero or less than zero");
        System.out.println("Review created: " + review2);
    }

    @Test
    void check_inValidReviewDate() {
        Review review3 = ReviewFactory.createReview(
                8, // rating
                "Everything was perfect! Highly recommended.",
                LocalDate.of(2026, 1, 1),
                null
        );
        assertNull(review3, "Expected to be null because the review date is in the future");
        System.out.println("Review created: " + review3);
    }
}