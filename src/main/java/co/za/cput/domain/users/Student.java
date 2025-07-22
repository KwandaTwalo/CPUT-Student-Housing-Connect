package co.za.cput.domain.users;
//Firstname:        Kwanda
//LastName:         Twalo
//Student Number:   218120192.

import co.za.cput.domain.business.Booking;
import co.za.cput.domain.generic.Contact;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Student {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long studentID;
    private String studentName;
    private String studentSurname;
    private LocalDate dateOfBirth;
    private String gender;

    @Enumerated(EnumType.STRING)//this tells JPA that you must store the values as VARCHAR.
    private FundingStatus fundingStatus;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "contact_id", referencedColumnName = "contactID")
    private Contact contact;

    //Bidirectional relationship between student and bookings. because it reflects a real world scenario.
    //example A Student makes bookings, and A booking belongs to a student.
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<Booking>();

    public enum FundingStatus {
        FUNDED,
        SELF_FUNDED,
        NOT_FUNDED
    }

    protected Student() {
    }

    private Student(Builder builder) {
        this.studentID = builder.studentID;
        this.studentName = builder.studentName;
        this.studentSurname = builder.studentSurname;
        this.dateOfBirth = builder.dateOfBirth;
        this.gender = builder.gender;
        this.fundingStatus = builder.fundingStatus;
        this.contact = builder.contact;
        this.bookings = builder.bookings;
    }

    public Long getStudentID() {
        return studentID;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getStudentSurname() {
        return studentSurname;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public FundingStatus getFundingStatus() {
        return fundingStatus;
    }

    public Contact getContact() {
        return contact;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentID='" + getStudentID() + '\n' +
                ", studentName='" + getStudentName() + '\n' +
                ", studentSurname='" + getStudentSurname() + '\n' +
                ", dateOfBirth=" + getDateOfBirth() + '\n' +
                ", gender='" + getGender() + '\'' +
                ", fundingStatus=" + getFundingStatus() + '\n' +
                ", Contacts=" + getContact() + '\n' +
                ", Bookings=" + getBookings() + '\n' +
                '}';
    }

    public static class Builder {
        private Long studentID;
        private String studentName;
        private String studentSurname;
        private LocalDate dateOfBirth;
        private String gender;
        private FundingStatus fundingStatus;
        private Contact contact;
        private List<Booking> bookings;

        public Builder setStudentID(Long studentID) {
            this.studentID = studentID;
            return this;
        }

        public Builder setStudentName(String studentName) {
            this.studentName = studentName;
            return this;
        }

        public Builder setStudentSurname(String studentSurname) {
            this.studentSurname = studentSurname;
            return this;
        }

        public Builder setDateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public Builder setGender(String gender) {
            this.gender = gender;
            return this;
        }

        public Builder setFundingStatus(FundingStatus fundingStatus) {
            this.fundingStatus = fundingStatus;
            return this;
        }

        public Builder setContact(Contact contact) {
            this.contact = contact;
            return this;
        }

        public Builder setBookings(List<Booking> bookings) {
            this.bookings = bookings;
            return this;
        }

        public Builder copy(Student student) {
            this.studentID = student.getStudentID();
            this.studentName = student.getStudentName();
            this.studentSurname = student.getStudentSurname();
            this.dateOfBirth = student.getDateOfBirth();
            this.gender = student.getGender();
            this.fundingStatus = student.getFundingStatus();
            this.contact = student.getContact();
            this.bookings = student.getBookings();
            return this;
        }

        public Student build() {
            return new Student(this);
        }
    }
}
