package co.za.cput.controller.business;

import co.za.cput.domain.business.Review;
import co.za.cput.service.business.implementation.ReviewServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/HouseConnect/Review")
public class ReviewController {

    private ReviewServiceImpl reviewService;

    @Autowired
    public ReviewController(ReviewServiceImpl reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ResponseEntity<Review> create(@RequestBody Review review) {
        Review createdReview = reviewService.create(review);
        return ResponseEntity.ok(createdReview);
    }

    @GetMapping("/read/{reviewID}")
    public ResponseEntity<Review> read(@PathVariable Long reviewID) {
        Review readReview = reviewService.read(reviewID);
        if (readReview == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(readReview);
    }

    @PutMapping("/update")
    public ResponseEntity<Review> update(@RequestBody Review review) {
        if (review.getReviewID() == null) {
            return ResponseEntity.badRequest().build();
        }
        Review updatedReview = reviewService.update(review);
        if (updatedReview == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedReview);
    }

    @GetMapping("/getAllReviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviewList = reviewService.getAllReviews();
        if (reviewList == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reviewList);
    }
//Needs testing.
    @PostMapping("/addToBooking/{bookingID}")
    public ResponseEntity<Review> addReviewToBooking(@PathVariable Long bookingID, @RequestBody Review review) {
        Review savedReview = reviewService.addReviewToBooking(bookingID, review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{reviewID}")
    public void delete(@PathVariable Long reviewID) {
        reviewService.delete(reviewID);
    }


}
