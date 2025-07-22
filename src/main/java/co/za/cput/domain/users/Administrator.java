package co.za.cput.domain.users;

import co.za.cput.domain.business.Verification;
import co.za.cput.domain.generic.Contact;
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

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "contact_ID", referencedColumnName = "contactID")
    private Contact contact;

    @OneToMany(mappedBy = "administrator", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Verification> verifications = new ArrayList<Verification>();

    protected Administrator(){}

    private Administrator(Builder builder){
        this.adminID = builder.adminID;
        this.adminName = builder.adminName;
        this.adminSurname = builder.adminSurname;
        this.contact = builder.contact;
        this.verifications = builder.verifications;
    }

    public Long getAdminID() {
        return adminID;
    }

    public String getAdminName() {
        return adminName;
    }

    public String getAdminSurname() {
        return adminSurname;
    }

    public Contact getContact() {
        return contact;
    }

    public List<Verification> getVerifications() {
        return verifications;
    }

    @Override
    public String toString() {
        return "Administrator{" +
                "adminId=" + adminID +
                ", adminName='" + adminName + '\'' +
                ", adminSurname='" + adminSurname + '\'' +
                ", contact=" + contact +
                ", verifications=" + verifications +
                '}';
    }

    public static class Builder {
        private Long adminID;
        private String adminName;
        private String adminSurname;
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
            this.contact = admin.getContact();
            this.verifications = admin.getVerifications();
            return this;
        }
        public Administrator build(){
            return new Administrator(this);
        }
    }
}
