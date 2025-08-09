package co.za.cput.service.business.implementation;

import co.za.cput.domain.business.Review;
import co.za.cput.factory.business.ReviewFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class ReviewServiceImplTest {

    @Autowired
    private ReviewServiceImpl reviewServiceImpl;

    private static Review review1 = ReviewFactory.createReview(
            9,
            "Perfect place to stay and have peace!",
            LocalDate.of(2024, 11, 30),
            null
    );

    @Test
    void a_create() {
        Review createReview = reviewServiceImpl.create(review1);
        assertNotNull(createReview);
        System.out.println("Review created: " + createReview);
    }

    @Test
    void b_read() {
        Review readReview = reviewServiceImpl.read(review1.getReviewID());
        assertNotNull(readReview);
        assertEquals(review1.getReviewID(), readReview.getReviewID());
        System.out.println("Review read: " + readReview);
    }

    @Test
    void c_update() {
        Review updateReview = new Review.Builder()
                .copy(review1)
                .setReviewDate(LocalDate.now())
                .setRating(8)
                .build();
        reviewServiceImpl.update(updateReview);

        //verify if the object is updated.
        Review readReview = reviewServiceImpl.read(updateReview.getReviewID());
        System.out.println("Review read: " + readReview);

        assertEquals(updateReview.getReviewID(), readReview.getReviewID());
        assertEquals(LocalDate.now(), updateReview.getReviewDate());
        assertEquals(8, updateReview.getRating());
        System.out.println("Review updated: " + updateReview);
    }

    @Test
    void d_getAllReviews() {
        List<Review> reviews = reviewServiceImpl.getAllReviews();
        assertNotNull(reviews);
        System.out.println("Reviews : " + reviews);
    }

    @Test
    void e_delete() {
        reviewServiceImpl.delete(review1.getReviewID());
        Review readReview = reviewServiceImpl.read(review1.getReviewID());
        assertNull(readReview);
        System.out.println("Review deleted: " + readReview);
    }
}