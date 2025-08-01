package co.za.cput.domain.business;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Review {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long reviewID;
    private int rating;
    private String comment;
    private LocalDate reviewDate;

    @OneToOne
    @JoinColumn(name = "booking_ID", referencedColumnName = "bookingID", nullable = true)
    private Booking booking;

    protected Review() {}

    private Review(Builder builder) {
        this.reviewID = builder.reviewID;
        this.rating = builder.rating;
        this.comment = builder.comment;
        this.reviewDate = builder.reviewDate;
        this.booking = builder.booking;
    }

    public Long getReviewID() {
        return reviewID;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public Booking getBooking() {
        return booking;
    }

    @Override
    public String toString() {
        return "Review{" +
                "reviewID=" + reviewID +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", reviewDate=" + reviewDate +
                ", booking=" + booking +
                '}';
    }

    public static class Builder {
        private Long reviewID;
        private int rating;
        private String comment;
        private LocalDate reviewDate;
        private Booking booking;

        public Builder setReviewID(Long reviewID) {
            this.reviewID = reviewID;
            return this;
        }
        public Builder setRating(int rating) {
            this.rating = rating;
            return this;
        }
        public Builder setComment(String comment) {
            this.comment = comment;
            return this;
        }
        public Builder setReviewDate(LocalDate reviewDate) {
            this.reviewDate = reviewDate;
            return this;
        }
        public Builder setBooking(Booking booking) {
            this.booking = booking;
            return this;
        }

        public Builder copy(Review review) {
            this.reviewID = review.getReviewID();
            this.rating = review.getRating();
            this.comment = review.getComment();
            this.reviewDate = review.getReviewDate();
            this.booking = review.getBooking();
            return this;
        }

        public Review build() {return new Review(this);}
    }
}
