package co.za.cput.factory.user;
//Firstname:        Kwanda
//LastName:         Twalo
//Student Number:   218120192.

import co.za.cput.domain.users.Student;
import co.za.cput.util.Helper;

import java.time.LocalDate;
import java.util.UUID;

public class StudentFactory {
    public Student createStudent(String studentName,
                                 String studentSurname,
                                 LocalDate studentDateOfBirth,
                                 String gender,
                                 Student.FundingStatus fundingStatus) {

        String studentID = UUID.randomUUID().toString();

        if (!Helper.validateStringDetails(studentName) ||
                !Helper.validateStringDetails(studentSurname) ||
                !Helper.validateStudentDateOfBirth(studentDateOfBirth) ||
                !Helper.validateStringDetails(gender)) {
            return null;
        }

        return new Student.Builder()
                .setStudentID(studentID)
                .setStudentName(studentName)
                .setStudentSurname(studentSurname)
                .setDateOfBirth(studentDateOfBirth)
                .setGender(gender)
                .setFundingStatus(fundingStatus)
                .build();
    }
}
