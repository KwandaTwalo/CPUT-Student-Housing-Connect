package co.za.cput.factory.business;

import co.za.cput.domain.business.Booking;
import co.za.cput.domain.business.Review;
import co.za.cput.util.Helper;

import java.time.LocalDate;

public class ReviewFactory {

    public static Review createReview(int rating,
                                      String comment,
                                      LocalDate reviewDate,
                                      Booking booking) {
        if (!Helper.isValidRating(rating) ||
                Helper.isNullorEmpty(comment) ||
                !Helper.isValid_ReviewDate(reviewDate)) {
            return null;
        }

        return new Review.Builder()
                .setRating(rating)
                .setComment(comment)
                .setReviewDate(reviewDate)
                .setBooking(booking)
                .build();

    }
}
