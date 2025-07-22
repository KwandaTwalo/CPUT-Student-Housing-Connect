package co.za.cput.factory.user;
//Firstname:        Kwanda
//LastName:         Twalo
//Student Number:   218120192.

import co.za.cput.domain.users.Student;
import co.za.cput.util.Helper;

import java.time.LocalDate;

public class StudentFactory {
    public Student createStudent(String studentName,
                                 String studentSurname,
                                 LocalDate studentDateOfBirth,
                                 String gender,
                                 Student.FundingStatus fundingStatus) {

        if (!Helper.validateStringDetails(studentName) ||
                !Helper.validateStringDetails(studentSurname) ||
                !Helper.validateStudentDateOfBirth(studentDateOfBirth) ||
                !Helper.validateStringDetails(gender)) {
            return null;
        }

        return new Student.Builder()
                .setStudentName(studentName)
                .setStudentSurname(studentSurname)
                .setDateOfBirth(studentDateOfBirth)
                .setGender(gender)
                .setFundingStatus(fundingStatus)
                .build();
    }
}
