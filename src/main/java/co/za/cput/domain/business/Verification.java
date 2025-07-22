package co.za.cput.domain.business;
//Firstname: Siyabonga
//Lastname:Jiyane
//Student Number: 222359676

import co.za.cput.domain.users.Administrator;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Verification {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long verificationID;
    private Date verificationDate;

    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus;

    public enum VerificationStatus {
        PENDING,
        APPROVED,
        REJECTED;
    }

    @ManyToOne
    @JoinColumn(name = "admin_ID", referencedColumnName = "adminID", nullable = false)
    private Administrator administrator;

    @OneToOne
    @JoinColumn(name = "accommodation_ID", referencedColumnName = "accommodationID", nullable = false)
    private Accommodation accommodation;

    protected Verification() {}

    private Verification(Builder builder) {
        this.verificationID = builder.verificationID;
        this.verificationDate = builder.verificationDate;
        this.verificationStatus = builder.verificationStatus;
        this.administrator = builder.administrator;
        this.accommodation = builder.accommodation;
    }

    public Long getVerificationID() {
        return verificationID;
    }

    public Date getVerificationDate() {
        return verificationDate;
    }

    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public Administrator getAdministrator() {
        return administrator;
    }

    public Accommodation getAccommodation() {
        return accommodation;
    }

    @Override
    public String toString() {
        return "Verification{" +
                "verificationID=" + verificationID +
                ", verificationDate=" + verificationDate +
                ", verificationStatus=" + verificationStatus +
                ", administrator=" + administrator +
                ", accommodation=" + accommodation +
                '}';
    }

    public static class Builder {
        private Long verificationID;
        private Date verificationDate;
        private VerificationStatus verificationStatus;
        private Administrator administrator;
        private Accommodation accommodation;

        public Builder setVerificationID(Long verificationID) {
            this.verificationID = verificationID;
            return this;
        }

        public Builder setVerificationDate(Date verificationDate) {
            this.verificationDate = verificationDate;
            return this;
        }

        public Builder setVerificationStatus(VerificationStatus verificationStatus) {
            this.verificationStatus = verificationStatus;
            return this;
        }

        public Builder setAdministrator(Administrator administrator) {
            this.administrator = administrator;
            return this;
        }
        public Builder setAccommodation(Accommodation accommodation) {
            this.accommodation = accommodation;
            return this;
        }

        public Builder copy(Verification verification) {
            this.verificationID = verification.getVerificationID();
            this.verificationDate = verification.getVerificationDate();
            this.verificationStatus = verification.getVerificationStatus();
            this.administrator = verification.getAdministrator();
            this.accommodation = verification.getAccommodation();
            return this;
        }

        public Verification build() {
            return new Verification(this);
        }
    }
}
