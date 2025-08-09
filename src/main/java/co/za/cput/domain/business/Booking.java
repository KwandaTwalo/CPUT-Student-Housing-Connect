package co.za.cput.domain.business;
//Firstname:        Kwanda
//LastName:         Twalo
//Student Number:   218120192.

import co.za.cput.domain.users.Student;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long bookingID;
    private LocalDate requestDate; //When the student initiated the booking process.
    private LocalDate checkInDate; //When the student will start staying at the accommodation.
    private LocalDate checkOutDate; //When the student is expected to leave.
    private double totalAmount; //total rent expected based on your choice.
    private LocalDateTime updatedAt; //tracks last update time for status changes in the booking.
    private LocalDateTime createdAt; //tracks when the booking was created in the system.


    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; //tracks if payment was made.

    public enum PaymentStatus {
        PENDING,
        PAID,
        PARTIALLY_PAID,
        OVERDUE
    }

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    public enum BookingStatus {
        CONFIRMED,
        IN_PROGRESS,
        FAILED;
    }

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "studentID", nullable = true)
    @JsonBackReference("student-booking")
    @JsonIgnoreProperties
    private Student student;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_ID", referencedColumnName = "accommodationID", nullable = true)
    @JsonBackReference
    @JsonIgnoreProperties
    private Accommodation accommodation;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, optional = true)//"booking" must match Booking type object name in Review.
    private Review review;

    protected Booking (){}

    private Booking(Builder builder) {
        this.bookingID = builder.bookingID;
        this.requestDate = builder.requestDate;
        this.checkInDate = builder.checkInDate;
        this.checkOutDate = builder.checkOutDate;
        this.totalAmount = builder.totalAmount;
        this.updatedAt = builder.updatedAt;
        this.createdAt = builder.createdAt;
        this.paymentStatus = builder.paymentStatus;
        this.bookingStatus = builder.bookingStatus;
        this.student = builder.student;
        this.accommodation = builder.accommodation;
        this.review = builder.review;
    }

    public Long getBookingID() {
        return bookingID;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
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
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", totalAmount=" + totalAmount +
                ", updatedAt=" + updatedAt +
                ", createdAt=" + createdAt +
                ", paymentStatus=" + paymentStatus +
                ", Booking status=" + bookingStatus +
                ", student=" + student +
                ", accommodation=" + accommodation +
                ", review=" + review +
                '}';
    }

    public static class Builder {
        private Long bookingID;
        private LocalDate requestDate;
        private LocalDate checkInDate;
        private LocalDate checkOutDate;
        private double totalAmount;
        private LocalDateTime updatedAt;
        private LocalDateTime createdAt;
        private PaymentStatus paymentStatus;
        private BookingStatus bookingStatus;
        private Student student;
        private Accommodation accommodation;
        private Review review;

        public Builder setBookingID(Long bookingID) {
            this.bookingID = bookingID;
            return this;
        }
        public Builder setRequestDate(LocalDate requestDate) {
            this.requestDate = requestDate;
            return this;
        }
        public Builder setCheckInDate(LocalDate checkInDate) {
            this.checkInDate = checkInDate;
            return this;
        }
        public Builder setCheckOutDate(LocalDate checkOutDate) {
            this.checkOutDate = checkOutDate;
            return this;
        }
        public Builder setTotalAmount(double totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }
        public Builder setUpdatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }
        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }
        public Builder setPaymentStatus(PaymentStatus paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }
        public Builder setBookingStatus(BookingStatus bookingStatus) {
            this.bookingStatus = bookingStatus;
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
            this.checkInDate = booking.getCheckInDate();
            this.checkOutDate = booking.getCheckOutDate();
            this.totalAmount = booking.getTotalAmount();
            this.updatedAt = booking.getUpdatedAt();
            this.createdAt = booking.getCreatedAt();
            this.paymentStatus = booking.getPaymentStatus();
            this.bookingStatus = booking.getBookingStatus();
            this.student = booking.getStudent();
            this.accommodation = booking.getAccommodation();
            this.review = booking.getReview();
            return this;
        }

        public Booking build() {return new Booking(this); }
    }
}
