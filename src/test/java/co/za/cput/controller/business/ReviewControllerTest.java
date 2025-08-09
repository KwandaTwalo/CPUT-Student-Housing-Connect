package co.za.cput.controller.business;

import co.za.cput.domain.business.Booking;
import co.za.cput.domain.business.Review;
import co.za.cput.factory.business.ReviewFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.MethodName.class)
class ReviewControllerTest {

    Booking mockBooking = mock(Booking.class);

    private Review review1 = ReviewFactory.createReview(
            5,
            "Not a bad place to stay I would say it has its people.",
            LocalDate.of(2025, 6, 30),
            null
    );

    private static Review review_with_ID;

    @Autowired
    private TestRestTemplate restTemplate;

    private static final String BASE_URL = "http://localhost:8080/HouseConnect/Review";


    @Test
    void a_create() {
        String url = BASE_URL + "/create";
        ResponseEntity<Review> createReview = this.restTemplate.postForEntity(url, review1, Review.class);
        assertNotNull(createReview.getBody());
        System.out.println("createReview = " + createReview.getBody());
        review_with_ID = createReview.getBody();
        assertNotNull(review_with_ID);
        System.out.println("Review with ID = " + review_with_ID);
    }

    @Test
    void b_read() {
        assertNotNull(review_with_ID);
        String url = BASE_URL + "/read/" + review_with_ID.getReviewID();
        ResponseEntity<Review> readReview = this.restTemplate.getForEntity(url, Review.class);
        assertNotNull(readReview.getBody());
        System.out.println("readReview = " + readReview.getBody());
    }

    @Test
    void c_update() {
        assertNotNull(review_with_ID);
        String url = BASE_URL + "/update";
        Review updateReview = new Review.Builder()
                .copy(review_with_ID)
                .setRating(2)
                .setComment("There's too much noise in the place you can't focus")
                .build();
        this.restTemplate.put(url, updateReview);

        //verify if the object has been updated.
        ResponseEntity<Review> readReview =
                this.restTemplate.getForEntity(BASE_URL + "/read/" + updateReview.getReviewID(), Review.class);
        System.out.println("reading the update review = " + readReview.getBody());

        assertNotNull(updateReview);
        assertEquals(2, updateReview.getRating());
        assertEquals("There's too much noise in the place you can't focus", updateReview.getComment());
        System.out.println("Updated review = " + updateReview);
    }

    @Test
    void d_getAllReviews() {
        assertNotNull(review_with_ID);
        String url = BASE_URL + "/getAllReviews";
        ResponseEntity<Review[]> reviews = this.restTemplate.getForEntity(url, Review[].class);
        assertNotNull(reviews.getBody());
        System.out.println("getAllReviews: ");
        for (Review review : reviews.getBody()) {
            System.out.println(review);
        }
    }

    @Test
    void e_delete() {
        assertNotNull(review_with_ID);
        String url = BASE_URL + "/delete/" + review_with_ID.getReviewID();
        System.out.println("Deleted review = " + review_with_ID);
        this.restTemplate.delete(url);

        ResponseEntity<Review> readReview =
                this.restTemplate.getForEntity(BASE_URL + "/read/" + review_with_ID.getReviewID(), Review.class);

        assertEquals(HttpStatus.NOT_FOUND, readReview.getStatusCode());
        System.out.println("After deletion the status code for readContact is: " + readReview.getStatusCode());
    }
}