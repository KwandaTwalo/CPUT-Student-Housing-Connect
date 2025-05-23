package co.za.cput.domain.business;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.


public class Accomodation {

        private String accomodationID;
        private String rent;
        private String roomType;
        private AccomodationStatus status;
        private String location;

    public enum AccomodationStatus {
        AVAILABLE,
        FULL,
    }


        private Accomodation(Accomodation.Builder builder) {

            this.accomodationID = builder.accomodationID;
            this.rent = builder.rent;
            this.roomType = builder.roomType;
            this.status = builder.status;
            this.location = builder.location;
        }

        public String getAccomodationID() {
            return accomodationID;
        }

    public String getRent() {
            return rent;
        }

        public String getRoomType() {
            return roomType;
        }

        public AccomodationStatus getStatus() {
            return status;
        }

        public String getLocation() {
            return location;
        }


            @Override
            public String toString() {
                return "Builder{" +
                        "accomodationID='" + accomodationID + '\'' +
                        ", rent='" + rent + '\'' +
                        ", roomType='" + roomType + '\'' +
                        ",  status=" + getStatus() + "\n" +
                        ", location='" + location + '\'' +
                        '}';
            }
            public static class Builder {
                private String accomodationID;
                private String rent;
                private String roomType;
                private AccomodationStatus status;
                private String location;


            public Builder setAccomodationID(String accomodationID) {
                this.accomodationID = accomodationID;
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

            public Builder setStatus(AccomodationStatus status) {
                this.status = status;
                return this;
            }

            public Builder setLocation(String location) {
                this.location = location;
                return this;
            }
            public Accomodation.Builder copy(Accomodation accomodation) {
                this.accomodationID = accomodation.getAccomodationID();
                this.rent = accomodation.getRent();
                this.roomType = accomodation.getRoomType();
                this.accomodationStatus = accomodation.getAccomodationStatus();
                this.location = accomodation.getLocation();
                return this;
            }
            public Accomodation build() {return new Accomodation(this);}
        }
    }



