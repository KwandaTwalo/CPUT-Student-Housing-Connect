package co.za.cput.domain.users;

import co.za.cput.domain.business.Accomodation;

public class Landlord {

    private String landlordID;
    private String landlordFirstName;
    private String landlordLastName;
    private String landlordEmail;
    private String landlordPhone;

    public Landlord() {}

    private Landlord (Landlord.Builder builder){

        this.landlordID = builder.landlordID;
        this.landlordFirstName = builder.landlordFirstName;
        this.landlordLastName = builder.landlordLastName;
        this.landlordEmail = builder.landlordEmail;
        this.landlordPhone = builder.landlordPhone;
    }
    public String getLandlordID() {
        return landlordID;
    }
    public String getLandlordFirstName() {
        return landlordFirstName;
    }
    public String getLandlordLastName() {
        return landlordLastName;
    }
    public String getLandlordEmail() {
        return landlordEmail;
    }
    public String getLandlordPhone() {
        return landlordPhone;
    }

    @Override
    public String toString() {
        return "Landlord{" +
                "landlordID='" + landlordID + '\'' +
                ", landlordFirstName='" + landlordFirstName + '\'' +
                ", landlordLastName='" + landlordLastName + '\'' +
                ", landlordEmail='" + landlordEmail + '\'' +
                ", landlordPhone='" + landlordPhone + '\'' +
                '}';
    }

    public static class Builder {
        private String landlordID;
        private String landlordFirstName;
        private String landlordLastName;
        private String landlordEmail;
        private String landlordPhone;

        public Builder setLandlordID(String landlordID) {
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

        public Builder setLandlordEmail(String landlordEmail) {
            this.landlordEmail = landlordEmail;
            return this;
        }

        public Builder setLandlordPhone(String landlordPhone) {
            this.landlordPhone = landlordPhone;
            return this;
        }
        public Landlord.Builder copy(Landlord landlord) {
            this.landlordID = landlord.getLandlordID();
            this.landlordFirstName = landlord.getLandlordFirstName();
            this.landlordLastName = landlord.getLandlordLastName();
            this.landlordEmail = landlord.getLandlordEmail();
            this.landlordPhone = landlord.getLandlordPhone();
            return this;
        }
        public Landlord build() {return new Landlord(this);}
    }

}
