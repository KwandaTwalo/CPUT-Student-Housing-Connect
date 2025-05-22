package co.za.cput.domain.business;
//Firstname:        Kwanda
//LastName:         Twalo
//Student Number:   218120192.

import java.util.Date;

public class Booking {
    private String bookingID;
    private Date requestDate;
    private BookingStatus status;

    public enum BookingStatus {
        CONFIRMED,
        IN_PROGRESS,
        FAILED;
    }

    public Booking (){}

    private Booking(Builder builder) {
        this.bookingID = builder.bookingID;
        this.requestDate = builder.requestDate;
        this.status = builder.status;
    }

    public String getBookingID() {
        return bookingID;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public BookingStatus getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingID=" + getBookingID() + "\n" +
                ", requestDate=" + getRequestDate() + "\n" +
                ", status=" + getStatus() + "\n" +
                '}';
    }

    public static class Builder {
        private String bookingID;
        private Date requestDate;
        private BookingStatus status;

        public Builder setBookingID(String bookingID) {
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

        public Builder copy (Booking booking) {
            this.bookingID = booking.getBookingID();
            this.requestDate = booking.getRequestDate();
            this.status = booking.getStatus();
            return this;
        }

        public Booking build() {return new Booking(this); }
    }
}
