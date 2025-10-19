package co.za.cput.domain.users;

import co.za.cput.domain.business.Verification;
import co.za.cput.domain.generic.Contact;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;

@Entity
public class Administrator {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long adminID;
    private String adminName;
    private String adminSurname;
    private String adminPassword;

    @Enumerated(EnumType.STRING)
    private AdminRoleStatus adminRoleStatus;

    public enum AdminRoleStatus {
        ACTIVE,
        INACTIVE,
        SUSPENDED
    }

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "contact_ID", referencedColumnName = "contactID")
    private Contact contact;

    @OneToMany(mappedBy = "administrator", cascade = CascadeType.ALL, orphanRemoval = false)
    @JsonManagedReference
    private List<Verification> verifications = new ArrayList<Verification>();

    protected Administrator(){}

    private Administrator(Builder builder){
        this.adminID = builder.adminID;
        this.adminName = builder.adminName;
        this.adminSurname = builder.adminSurname;
        this.adminPassword = builder.adminPassword;
        this.adminRoleStatus = builder.adminRoleStatus;
        this.contact = builder.contact;
        this.verifications = builder.verifications != null ? builder.verifications : new ArrayList<>();
    }


    public Long getAdminID() {
        return adminID;
    }

    public void setAdminID(Long adminID) {
        this.adminID = adminID;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getAdminSurname() {
        return adminSurname;
    }

    public void setAdminSurname(String adminSurname) {
        this.adminSurname = adminSurname;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public AdminRoleStatus getAdminRoleStatus() {
        return adminRoleStatus;
    }

    public void setAdminRoleStatus(AdminRoleStatus adminRoleStatus) {
        this.adminRoleStatus = adminRoleStatus;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public List<Verification> getVerifications() {
        return verifications;
    }

    public void setVerifications(List<Verification> verifications) {
        this.verifications = verifications != null ? verifications : new ArrayList<>();
    }

    @Override
    public String toString() {
        return "Administrator{" +
                "adminID=" + adminID +
                ", adminName='" + adminName + '\'' +
                ", adminSurname='" + adminSurname + '\'' +
                ", adminPassword='" + adminPassword + '\'' +
                ", adminRoleStatus=" + adminRoleStatus +
                ", contact=" + contact +
                ", verifications=" + verifications +
                '}';
    }

    public static class Builder {
        private Long adminID;
        private String adminName;
        private String adminSurname;
        private String adminPassword;
        private AdminRoleStatus adminRoleStatus;
        private Contact contact;
        private List<Verification> verifications;

        public Builder setAdminID(Long adminID) {
            this.adminID = adminID;
            return this;
        }

        public Builder setAdminName(String adminName) {
            this.adminName = adminName;
            return this;
        }

        public Builder setAdminSurname(String adminSurname) {
            this.adminSurname = adminSurname;
            return this;
        }
        public Builder setAdminPassword(String adminPassword) {
            this.adminPassword = adminPassword;
            return this;
        }
        public Builder setAdminRoleStatus(AdminRoleStatus adminRoleStatus) {
            this.adminRoleStatus = adminRoleStatus;
            return this;
        }
        public Builder setContact(Contact contact) {
            this.contact = contact;
            return this;
        }
        public Builder setVerifications(List<Verification> verifications) {
            this.verifications = verifications;
            return this;
        }

        public Builder copy(Administrator admin){
            this.adminID = admin.getAdminID();
            this.adminName = admin.getAdminName();
            this.adminSurname = admin.getAdminSurname();
            this.adminPassword = admin.getAdminPassword();
            this.adminRoleStatus = admin.getAdminRoleStatus();
            this.contact = admin.getContact();
            this.verifications = admin.getVerifications();
            return this;
        }
        public Administrator build(){
            return new Administrator(this);
        }
    }
}

/*{
        "adminName": "Simphiwwe",
    "adminSurname": "Thwabuse",
    "adminPassword": "secureAdminPass456",
    "adminRoleStatus": "ACTIVE",
    "contact": {
        "email": "thabo.nkosi@adminportal.com",
        "phoneNumber": "0740001122",
        "alternatePhoneNumber": "0731112233",
        "isEmailVerified": true,
        "isPhoneVerified": true,
        "preferredContactMethod": "EMAIL"
        },
    "verifications": [
        {
        "verificationDate": "2025-08-01",
            "notes": "Verified based on submitted lease agreement and utility bill.",
            "createAt": "2025-07-30T10:00:00",
            "updateAt": "2025-08-01T14:30:00",
            "verificationStatus": "APPROVED",
            "accommodation": {
                "rent": 2800.00,
                "wifiAvailable": true,
                "furnished": false,
                "distanceFromCampus": 2.5,
                "utilitiesIncluded": false,
                "roomType": "DOUBLE",
                "bathroomType": "SHARED",
                "accommodationStatus": "AVAILABLE",
                "address": {
                    "streetNumber": "45B",
                    "streetName": "Boundary Road",
                    "suburb": "Observatory",
                    "city": "Cape Town",
                    "postalCode": 7925
                },
                "landlord": {
                    "landlordFirstName": "Nomsa",
                    "landlordLastName": "Zulu",
                    "isVerified": true,
                    "dateRegistered": "2024-12-10",
                    "password": "nomsaLandlordPass2024",
                    "contact": {
                        "email": "nomsa.zulu@landlords.co.za",
                        "phoneNumber": "0765432198",
                        "alternatePhoneNumber": "0743219876",
                        "isEmailVerified": true,
                        "isPhoneVerified": false,
                        "preferredContactMethod": "PHONE"
                    }
                }
            }
        }
    ]
}
*/