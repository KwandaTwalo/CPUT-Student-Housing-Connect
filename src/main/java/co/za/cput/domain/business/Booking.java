package co.za.cput.domain.business;
//Firstname:        Kwanda
//LastName:         Twalo
//Student Number:   218120192.

import co.za.cput.domain.users.Student;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Booking {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long bookingID;
    private Date requestDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "studentID", nullable = false)
    private Student student;

    public enum BookingStatus {
        CONFIRMED,
        IN_PROGRESS,
        FAILED;
    }

    @ManyToOne
    @JoinColumn(name = "accommodation_ID", referencedColumnName = "accommodationID", nullable = false)
    private Accommodation accommodation;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, optional = true)//"booking" must match Booking type object name in Review.
    private Review review;

    protected Booking (){}

    private Booking(Builder builder) {
        this.bookingID = builder.bookingID;
        this.requestDate = builder.requestDate;
        this.status = builder.status;
        this.student = builder.student;
        this.accommodation = builder.accommodation;
        this.review = builder.review;
    }

    public Long getBookingID() {
        return bookingID;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public Student getStudent() {
        return student;
    }

    public Accommodation getAccommodation() {
        return accommodation;
    }

    public Review getReview() {
        return review;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingID=" + bookingID +
                ", requestDate=" + requestDate +
                ", status=" + status +
                ", student=" + student +
                ", accommodation=" + accommodation +
                ", review=" + review +
                '}';
    }

    public static class Builder {
        private Long bookingID;
        private Date requestDate;
        private BookingStatus status;
        private Student student;
        private Accommodation accommodation;
        private Review review;

        public Builder setBookingID(Long bookingID) {
            this.bookingID = bookingID;
            return this;
        }
        public Builder setRequestDate(Date requestDate) {
            this.requestDate = requestDate;
            return this;
        }
        public Builder setStatus(BookingStatus status) {
            this.status = status;
            return this;
        }
        public Builder setStudent(Student student) {
            this.student = student;
            return this;
        }
        public Builder setAccommodation(Accommodation accommodation) {
            this.accommodation = accommodation;
            return this;
        }
        public Builder setReview(Review review) {
            this.review = review;
            return this;
        }

        public Builder copy (Booking booking) {
            this.bookingID = booking.getBookingID();
            this.requestDate = booking.getRequestDate();
            this.status = booking.getStatus();
            this.student = booking.getStudent();
            this.accommodation = booking.getAccommodation();
            this.review = booking.getReview();
            return this;
        }

        public Booking build() {return new Booking(this); }
    }
}
