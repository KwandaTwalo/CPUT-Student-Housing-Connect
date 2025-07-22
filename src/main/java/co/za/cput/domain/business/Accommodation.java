package co.za.cput.domain.business;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.generic.Address;
import co.za.cput.domain.users.Landlord;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Accommodation {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long accommodationID;
    private String rent;
    private String roomType;

    @Enumerated(EnumType.STRING)
    private AccommodationStatus accommodationStatus;

    public enum AccommodationStatus {
        AVAILABLE,
        FULL,
    }

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_ID", referencedColumnName = "addressID")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "landLord_ID", referencedColumnName = "landLordID")
    private Landlord landlord;

    @OneToMany(mappedBy ="accommodation",cascade = CascadeType.ALL, orphanRemoval = true)//"accommodation" must match the object name in booking;
    private List<Booking> bookings = new ArrayList<Booking>();

    protected Accommodation() {
    }

    private Accommodation(Accommodation.Builder builder) {
        this.accommodationID = builder.accommodationID;
        this.rent = builder.rent;
        this.roomType = builder.roomType;
        this.accommodationStatus = builder.accommodationStatus;
    }

    public Long getAccommodationID() {
        return accommodationID;
    }

    public String getRent() {
        return rent;
    }

    public String getRoomType() {
        return roomType;
    }

    public AccommodationStatus getAccommodationStatus() {
        return accommodationStatus;
    }

    public Address getAddress() {
        return address;
    }

    public Landlord getLandlord() {
        return landlord;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    @Override
    public String toString() {
        return "Accommodation{" +
                "accommodationID=" + accommodationID +
                ", rent='" + rent + '\'' +
                ", roomType='" + roomType + '\'' +
                ", accommodationStatus=" + accommodationStatus +
                ", address=" + address +
                ", landlord=" + landlord +
                ", bookings=" + bookings +
                '}';
    }

    public static class Builder {
        private Long accommodationID;
        private String rent;
        private String roomType;
        private AccommodationStatus accommodationStatus;
        private Address address;
        private Landlord landlord;
        private List<Booking> bookings;


        public Builder setAccommodationID(Long accommodationID) {
            this.accommodationID = accommodationID;
            return this;
        }

        public Builder setRent(String rent) {
            this.rent = rent;
            return this;
        }

        public Builder setRoomType(String roomType) {
            this.roomType = roomType;
            return this;
        }

        public Builder setAccommodationStatus(AccommodationStatus accommodationStatus) {
            this.accommodationStatus = accommodationStatus;
            return this;
        }

        public Builder setAddress(Address address) {
            this.address = address;
            return this;
        }

        public Builder setLandlord(Landlord landlord) {
            this.landlord = landlord;
            return this;
        }

        public Builder setBookings(List<Booking> bookings) {
            this.bookings = bookings;
            return this;
        }

        public Accommodation.Builder copy(Accommodation accommodation) {
            this.accommodationID = accommodation.getAccommodationID();
            this.rent = accommodation.getRent();
            this.roomType = accommodation.getRoomType();
            this.accommodationStatus = accommodation.getAccommodationStatus();
            this.address = accommodation.getAddress();
            this.landlord = accommodation.getLandlord();
            return this;
        }

        public Accommodation build() {
            return new Accommodation(this);
        }
    }
}



