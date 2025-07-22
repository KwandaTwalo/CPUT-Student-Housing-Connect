package co.za.cput.domain.users;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.generic.Contact;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Landlord {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long landlordID;
    private String landlordFirstName;
    private String landlordLastName;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "contact_ID", referencedColumnName = "contactID")
    private Contact contact;

    @OneToMany(mappedBy = "landlord",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Accommodation> accommodationList = new ArrayList<Accommodation>();

    protected Landlord() {
    }

    private Landlord(Landlord.Builder builder) {
        this.landlordID = builder.landlordID;
        this.landlordFirstName = builder.landlordFirstName;
        this.landlordLastName = builder.landlordLastName;
        this.contact = builder.contact;
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
                ", contact=" + contact +
                ", accommodationList=" + accommodationList +
                '}';
    }

    public static class Builder {
        private Long landlordID;
        private String landlordFirstName;
        private String landlordLastName;
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
            this.contact = landlord.getContact();
            this.accommodationList = landlord.getAccommodationList();
            return this;
        }

        public Landlord build() {
            return new Landlord(this);
        }
    }

}
