package co.za.cput.domain.generic;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

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
    private String alternatePhoneNumber;

    @JsonProperty("isEmailVerified")
    @Column(name = "is_email_verified")
    private boolean isEmailVerified;

    @JsonProperty("isPhoneVerified")
    @Column(name = "is_phone_verified")
    private boolean isPhoneVerified;

    @Enumerated(EnumType.STRING)
    private PreferredContactMethod preferredContactMethod;

    public enum PreferredContactMethod {
        EMAIL,
        PHONE,
        ALTERNATE_PHONE
    }

    protected Contact() {
    }

    private Contact(Builder builder) {
        this.contactID = builder.contactID;
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
        this.alternatePhoneNumber = builder.alternatePhoneNumber;
        this.isEmailVerified = builder.isEmailVerified;
        this.isPhoneVerified = builder.isPhoneVerified;
        this.preferredContactMethod = builder.preferredContactMethod;
    }

    public Long getContactID() {
        return contactID;
    }

    public void setContactID(Long contactID) {
        this.contactID = contactID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAlternatePhoneNumber() {
        return alternatePhoneNumber;
    }

    public void setAlternatePhoneNumber(String alternatePhoneNumber) {
        this.alternatePhoneNumber = alternatePhoneNumber;
    }

    public boolean isEmailVerified() {
        return isEmailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        isEmailVerified = emailVerified;
    }

    public boolean isPhoneVerified() {
        return isPhoneVerified;
    }

    public void setPhoneVerified(boolean phoneVerified) {
        isPhoneVerified = phoneVerified;
    }

    public PreferredContactMethod getPreferredContactMethod() {
        return preferredContactMethod;
    }

    public void setPreferredContactMethod(PreferredContactMethod preferredContactMethod) {
        this.preferredContactMethod = preferredContactMethod;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "contactID=" + contactID +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", alternatePhoneNumber='" + alternatePhoneNumber + '\'' +
                ", isEmailVerified=" + isEmailVerified +
                ", isPhoneVerified=" + isPhoneVerified +
                ", preferredContactMethod=" + preferredContactMethod +
                '}';
    }

    public static class Builder {
        private Long contactID;
        private String email;
        private String phoneNumber;
        private String alternatePhoneNumber;
        private boolean isEmailVerified;
        private boolean isPhoneVerified;
        private PreferredContactMethod preferredContactMethod;

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

        public Builder setAlternatePhoneNumber(String alternatePhoneNumber) {
            this.alternatePhoneNumber = alternatePhoneNumber;
            return this;
        }

        public Builder setIsEmailVerified(boolean isEmailVerified) {
            this.isEmailVerified = isEmailVerified;
            return this;
        }

        public Builder setIsPhoneVerified(boolean isPhoneVerified) {
            this.isPhoneVerified = isPhoneVerified;
            return this;
        }

        public Builder setPreferredContactMethod(PreferredContactMethod preferredContactMethod) {
            this.preferredContactMethod = preferredContactMethod;
            return this;
        }

        public Builder copy(Contact contact) {
            this.contactID = contact.getContactID();
            this.email = contact.getEmail();
            this.phoneNumber = contact.getPhoneNumber();
            this.alternatePhoneNumber = contact.getAlternatePhoneNumber();
            this.isEmailVerified = contact.isEmailVerified();
            this.isPhoneVerified = contact.isPhoneVerified();
            this.preferredContactMethod = contact.getPreferredContactMethod();
            return this;
        }

        public Contact build() {
            return new Contact(this);
        }
    }
}
