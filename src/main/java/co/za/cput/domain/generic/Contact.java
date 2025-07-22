package co.za.cput.domain.generic;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//Firstname:        Tandile
//LastName:         Malifethe
//Student Number:   222602511
@Entity
public class Contact {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long contactID;
    private String email;
    private String phoneNumber;

    protected Contact() {
    }

    private Contact(Builder builder) {
        this.contactID = builder.contactID;
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
    }

    public Long getContactID() {
        return contactID;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "contactID='" + contactID + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    public static class Builder {
        private Long contactID;
        private String email;
        private String phoneNumber;

        public Builder setContactID(Long contactID) {
            this.contactID = contactID;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder copy(Contact contact) {
            this.contactID = contact.contactID;
            this.email = contact.email;
            this.phoneNumber = contact.phoneNumber;
            return this;
        }

        public Contact build() {
            return new Contact(this);
        }
    }
}
