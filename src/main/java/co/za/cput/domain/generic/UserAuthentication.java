package co.za.cput.domain.generic;

import co.za.cput.domain.users.Student;
import co.za.cput.domain.users.Landlord;
import co.za.cput.domain.users.Administrator;
import jakarta.persistence.*;

@Entity
public class UserAuthentication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authenticationId;

    private String username;
    private String password; // store hashed password only

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    // Unidirectional relationships
    // Required: Contact must not be null
    @OneToOne(cascade = CascadeType.ALL, optional = false) // optional = false means NOT NULL
    @JoinColumn(name = "contact_id", referencedColumnName = "contactID", nullable = false)
    private Contact contact;

    // Optional: Users can be null
    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "student_id", referencedColumnName = "studentID", nullable = true)
    private Student student;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "landlord_id", referencedColumnName = "landlordID", nullable = true)
    private Landlord landlord;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "admin_id", referencedColumnName = "adminID", nullable = true)
    private Administrator administrator;

    public enum UserRole {
        STUDENT,
        LANDLORD,
        ADMINISTRATOR
    }

    protected UserAuthentication() {}

    private UserAuthentication(Builder builder) {
        this.authenticationId = builder.authenticationId;
        this.username = builder.username;
        this.password = builder.password;
        this.userRole = builder.userRole;
        this.contact = builder.contact;
        this.student = builder.student;
        this.landlord = builder.landlord;
        this.administrator = builder.administrator;
    }

    // Getters
    public Long getAuthenticationId() { return authenticationId; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public UserRole getUserRole() { return userRole; }
    public Contact getContact() { return contact; }
    public Student getStudent() { return student; }
    public Landlord getLandlord() { return landlord; }
    public Administrator getAdministrator() { return administrator; }

    @Override
    public String toString() {
        return "UserAuthentication{" +
                "authenticationId=" + authenticationId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", userRole=" + userRole +// the below 4 lines are included so that we print only the ID's of each entity if it's available.
                ", contact=" + (contact != null ? contact.getContactID() : null) +
                ", student=" + (student != null ? student.getStudentID() : null) +
                ", landlord=" + (landlord != null ? landlord.getLandlordID() : null) +
                ", administrator=" + (administrator != null ? administrator.getAdminID() : null) +
                '}';
    }

    // Builder
    public static class Builder {
        private Long authenticationId;
        private String username;
        private String password;
        private UserRole userRole;
        private Contact contact;
        private Student student;
        private Landlord landlord;
        private Administrator administrator;

        public Builder setAuthenticationId(Long authenticationId) {
            this.authenticationId = authenticationId;
            return this;
        }

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setUserRole(UserRole userRole) {
            this.userRole = userRole;
            return this;
        }

        public Builder setContact(Contact contact) {
            this.contact = contact;
            return this;
        }

        public Builder setStudent(Student student) {
            this.student = student;
            return this;
        }

        public Builder setLandlord(Landlord landlord) {
            this.landlord = landlord;
            return this;
        }

        public Builder setAdministrator(Administrator administrator) {
            this.administrator = administrator;
            return this;
        }

        public Builder copy(UserAuthentication auth) {
            this.authenticationId = auth.authenticationId;
            this.username = auth.username;
            this.password = auth.password;
            this.userRole = auth.userRole;
            this.contact = auth.contact;
            this.student = auth.student;
            this.landlord = auth.landlord;
            this.administrator = auth.administrator;
            return this;
        }

        public UserAuthentication build() {
            return new UserAuthentication(this);
        }
    }
}
