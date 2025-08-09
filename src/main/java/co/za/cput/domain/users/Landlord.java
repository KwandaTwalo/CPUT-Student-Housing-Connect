package co.za.cput.domain.users;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.generic.Contact;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Landlord {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long landlordID;
    private String landlordFirstName;
    private String landlordLastName;
    private boolean isVerified; //To indicate if the landlord's identity or business has been verified by admin.
    private LocalDate dateRegistered; //Date the LandLord registered to the system.
    private String password;


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "contact_ID", referencedColumnName = "contactID")
    private Contact contact;

    @OneToMany(mappedBy = "landlord", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("landlord-accommodation")
    private List<Accommodation> accommodationList = new ArrayList<Accommodation>();


    protected Landlord() {
    }

    private Landlord(Landlord.Builder builder) {
        this.landlordID = builder.landlordID;
        this.landlordFirstName = builder.landlordFirstName;
        this.landlordLastName = builder.landlordLastName;
        this.isVerified = builder.isVerified;
        this.dateRegistered = builder.dateRegistered;
        this.password = builder.password;
        this.contact = builder.contact;
        this.accommodationList = builder.accommodationList;
    }

    public Long getLandlordID() {
        return landlordID;
    }

    public String getLandlordFirstName() {
        return landlordFirstName;
    }

    public String getLandlordLastName() {
        return landlordLastName;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public LocalDate getDateRegistered() {
        return dateRegistered;
    }

    public String getPassword() {
        return password;
    }

    public Contact getContact() {
        return contact;
    }

    public List<Accommodation> getAccommodationList() {
        return accommodationList;
    }

    @Override
    public String toString() {
        return "Landlord{" +
                "landlordID=" + landlordID +
                ", landlordFirstName='" + landlordFirstName + '\'' +
                ", landlordLastName='" + landlordLastName + '\'' +
                ", isVerified=" + isVerified +
                ", dateRegistered=" + dateRegistered +
                ", password='" + password + '\'' +
                ", contact=" + contact +
                ", accommodationID(s)=" + (accommodationList == null ? "[]" :
                accommodationList.stream()
                        .map(acc -> acc != null ? acc.getAccommodationID() : "null")
                        .toList()
        ) +
                '}';
    }

    public static class Builder {
        private Long landlordID;
        private String landlordFirstName;
        private String landlordLastName;
        private boolean isVerified;
        private LocalDate dateRegistered;
        private String password;
        private Contact contact;
        private List<Accommodation> accommodationList;

        public Builder setLandlordID(Long landlordID) {
            this.landlordID = landlordID;
            return this;
        }

        public Builder setLandlordFirstName(String landlordFirstName) {
            this.landlordFirstName = landlordFirstName;
            return this;
        }

        public Builder setLandlordLastName(String landlordLastName) {
            this.landlordLastName = landlordLastName;
            return this;
        }

        public Builder setVerified(boolean isVerified) {
            this.isVerified = isVerified;
            return this;
        }

        public Builder setDateRegistered(LocalDate dateRegistered) {
            this.dateRegistered = dateRegistered;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setContact(Contact contact) {
            this.contact = contact;
            return this;
        }

        public Builder setAccommodationList(List<Accommodation> accommodationList) {
            this.accommodationList = accommodationList;
            return this;
        }

        public Landlord.Builder copy(Landlord landlord) {
            this.landlordID = landlord.getLandlordID();
            this.landlordFirstName = landlord.getLandlordFirstName();
            this.landlordLastName = landlord.getLandlordLastName();
            this.isVerified = landlord.isVerified();
            this.dateRegistered = landlord.getDateRegistered();
            this.password = landlord.getPassword();
            this.contact = landlord.getContact();
            this.accommodationList = landlord.getAccommodationList();
            return this;
        }

        public Landlord build() {
            return new Landlord(this);
        }
    }

}

//Object used in POSTMAN for Testing:
/*
{
        "landlordFirstName": "Thabo",
        "landlordLastName": "Nkosi",
        "isVerified": true,
        "dateRegistered": "2025-08-04",
        "password": "StrongP@ssw0rd!",
        "contact": {
        "email": "thabo.nkosi@example.com",
        "phoneNumber": "0721234567",
        "alternatePhoneNumber": "0837654321",
        "isEmailVerified": true,
        "isPhoneVerified": true,
        "preferredContactMethod": "EMAIL"
        },
        "accommodationList": [
        {
        "rent": 3500.0,
        "wifiAvailable": true,
        "furnished": true,
        "distanceFromCampus": 1.5,
        "utilitiesIncluded": true,
        "roomType": "SINGLE",
        "bathroomType": "PRIVATE",
        "accommodationStatus": "AVAILABLE",
        "address": {
        "streetNumber": "12A",
        "streetName": "Victoria Road",
        "suburb": "Mowbray",
        "city": "Cape Town",
        "postalCode": 7700
        }
        },
        {
        "rent": 2800.0,
        "wifiAvailable": false,
        "furnished": false,
        "distanceFromCampus": 2.3,
        "utilitiesIncluded": false,
        "roomType": "SHARED",
        "bathroomType": "SHARED",
        "accommodationStatus": "AVAILABLE",
        "address": {
        "streetNumber": "45",
        "streetName": "Church Street",
        "suburb": "Observatory",
        "city": "Cape Town",
        "postalCode": 7925
        }
        }
        ]
        }
*/

/*{
        "landlordFirstName": "Nomsa",
        "landlordLastName": "Dlamini",
        "isVerified": false,
        "dateRegistered": "2025-08-07",
        "password": "SafeP@ss987!",
        "contact": {
        "email": "nomsa.dlamini@housingmail.com",
        "phoneNumber": "0738881122",
        "alternatePhoneNumber": "0812345678",
        "isEmailVerified": false,
        "isPhoneVerified": true,
        "preferredContactMethod": "PHONE"
        },
        "accommodationList": [
        {
        "rent": 4200.0,
        "wifiAvailable": true,
        "furnished": true,
        "distanceFromCampus": 0.8,
        "utilitiesIncluded": true,
        "roomType": "SINGLE",
        "bathroomType": "PRIVATE",
        "accommodationStatus": "AVAILABLE",
        "address": {
        "streetNumber": "18B",
        "streetName": "Main Road",
        "suburb": "Rondebosch",
        "city": "Cape Town",
        "postalCode": 7701
        }
        },
        {
        "rent": 3100.0,
        "wifiAvailable": false,
        "furnished": true,
        "distanceFromCampus": 2.0,
        "utilitiesIncluded": false,
        "roomType": "SHARED",
        "bathroomType": "SHARED",
        "accommodationStatus": "AVAILABLE",
        "address": {
        "streetNumber": "102",
        "streetName": "Durban Road",
        "suburb": "Bellville",
        "city": "Cape Town",
        "postalCode": 7530
        }
        }
        ]
        }*/

