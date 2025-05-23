package co.za.cput.domain.generic;

// Contact.java
// Domain class for Contact
// Author: T.Malifethe 222602511
public class Contact {
    private String contactid;
    private String email;
    private String phoneNumber;

    private Contact(Builder builder) {
        this.contactid = builder.contactid;
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
    }

    public String getContactid() {
        return contactid;
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
                "contactid='" + contactid + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    public static class Builder {
        private String contactid;
        private String email;
        private String phoneNumber;

        public Builder setContactid(String contactid) {
            this.contactid = contactid;
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
            this.contactid = contact.contactid;
            this.email = contact.email;
            this.phoneNumber = contact.phoneNumber;
            return this;
        }

        public Contact build() {
            return new Contact(this);
        }
    }
}
