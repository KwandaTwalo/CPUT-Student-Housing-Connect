package co.za.cput.service.business;

import co.za.cput.domain.business.Review;
import co.za.cput.service.IService;

import java.util.List;

public interface IReviewService extends IService<Review, Long> {
    List<Review> getAllReviews();
    Review addReviewToBooking(Long bookingID, Review review);
}
