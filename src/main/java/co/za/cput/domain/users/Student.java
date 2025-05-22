package co.za.cput.domain.users;
//Firstname:        Kwanda
//LastName:         Twalo
//Student Number:   218120192.

import java.time.LocalDate;

public class Student {

    private String studentID;
    private String studentName;
    private String studentSurname;
    private LocalDate dateOfBirth;
    private String gender;
    private FundingStatus fundingStatus;

    public enum FundingStatus {
        FUNDED,
        SELF_FUNDED,
        NOT_FUNDED
    }

    public Student() {}

    private Student(Builder builder) {
        this.studentID = builder.studentID;
        this.studentName = builder.studentName;
        this.studentSurname = builder.studentSurname;
        this.dateOfBirth = builder.dateOfBirth;
        this.gender = builder.gender;
        this.fundingStatus = builder.fundingStatus;
    }

    public String getStudentID() {
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

    @Override
    public String toString() {
        return "Student{" +
                "studentID='" + getStudentID() + '\n' +
                ", studentName='" + getStudentName() + '\n' +
                ", studentSurname='" + getStudentSurname()+ '\n' +
                ", dateOfBirth=" + getDateOfBirth() + '\n' +
                ", gender='" + getGender() + '\'' +
                ", fundingStatus=" + getFundingStatus() + '\n' +
                '}';
    }

    public static class Builder {
        private String studentID;
        private String studentName;
        private String studentSurname;
        private LocalDate dateOfBirth;
        private String gender;
        private FundingStatus fundingStatus;

        public Builder setStudentID(String studentID) {
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

        public Builder copy(Student student) {
            this.studentID = student.getStudentID();
            this.studentName = student.getStudentName();
            this.studentSurname = student.getStudentSurname();
            this.dateOfBirth = student.getDateOfBirth();
            this.gender = student.getGender();
            this.fundingStatus = student.getFundingStatus();
            return this;
        }
        public Student build() {return new Student(this);}
    }
}
