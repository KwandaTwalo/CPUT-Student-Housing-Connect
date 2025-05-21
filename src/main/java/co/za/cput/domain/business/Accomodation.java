package co.za.cput.domain.business;

public class Accomodation {

        private String accomodationID;
        private String accomodationName;
        private String rent;
        private String roomType;
        private String availabilityStatus;
        private String location;


        public Accomodation() {
        }

        private Accomodation(Accomodation.Builder builder) {

            this.accomodationID = builder.accomodationID;
            this.accomodationName = builder.accomodationName;
            this.rent = builder.rent;
            this.roomType = builder.roomType;
            this.availabilityStatus = builder.availabilityStatus;
            this.location = builder.location;
        }

        public String getAccomodationID() {
            return accomodationID;
        }

    public String getAccomodationName() {
        return accomodationName;
    }

    public String getRent() {
            return rent;
        }

        public String getRoomType() {
            return roomType;
        }

        public String getAvailabilityStatus() {
            return availabilityStatus;
        }

        public String getLocation() {
            return location;
        }


            @Override
            public String toString() {
                return "Builder{" +
                        "accomodationID='" + accomodationID + '\'' +
                        ", accomodationName='" + accomodationName + '\'' +
                        ", rent='" + rent + '\'' +
                        ", roomType='" + roomType + '\'' +
                        ", availabilityStatus='" + availabilityStatus + '\'' +
                        ", location='" + location + '\'' +
                        '}';
            }
            public static class Builder {
                private String accomodationID;
                private String accomodationName;
                private String rent;
                private String roomType;
                private String availabilityStatus;
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

            public Builder setAccomodationName(String accomodationName) {
                this.accomodationName = accomodationName;
                return this;
            }

            public Builder setAvailabilityStatus(String availabilityStatus) {
                this.availabilityStatus = availabilityStatus;
                return this;
            }

            public Builder setLocation(String location) {
                this.location = location;
                return this;
            }
            public Accomodation.Builder copy(Accomodation accomodation) {
                this.accomodationID = accomodation.getAccomodationID();
                this.accomodationName = accomodation.getAccomodationName();
                this.rent = accomodation.getRent();
                this.roomType = accomodation.getRoomType();
                this.availabilityStatus = accomodation.getAvailabilityStatus();
                this.location = accomodation.getLocation();
                return this;
            }
            public Accomodation build() {return new Accomodation(this);}
        }
    }



