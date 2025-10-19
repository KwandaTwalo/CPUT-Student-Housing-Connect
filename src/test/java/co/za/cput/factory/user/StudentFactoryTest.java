package co.za.cput.factory.user;



import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Student;
import co.za.cput.factory.generic.ContactFactory;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class StudentFactoryTest {

    private static Contact contact1 = ContactFactory.createContact(
            "Abigail@yahoo.com",
            "0712345678",
            "0723456789",
            true,
            true,
            Contact.PreferredContactMethod.EMAIL
    );

    private static Student student1 = StudentFactory.createStudent(
            "Kwanda",
            "Twalo",
            LocalDate.of(2000, 5, 15),
            "Male",
            //"student123",
            LocalDateTime.now(),
            true,
            Student.FundingStatus.FUNDED,
            contact1,
            null
    );

    @Test
    void createStudent_valid() {
        Student student = StudentFactory.createStudent(
                "Kwanda",
                "Twalo",
                LocalDate.of(2000, 5, 15), // valid DOB
                "Male",
                //"student123",
                LocalDateTime.now(), // valid registration date
                true,
                Student.FundingStatus.FUNDED,
                contact1,
                null
        );
        assertNotNull(student);
        System.out.println("Created student: " + student);
    }

    @Test
    void testInvalidDateOfBirth() {
        Student student = StudentFactory.createStudent(
                "Young",
                "Student",
                LocalDate.now().minusYears(15), // too young (invalid)
                "Female",
                //"student123",
                LocalDateTime.now(),
                true,
                Student.FundingStatus.NOT_FUNDED,
                contact1,
                null
        );

        assertNull(student);
        System.out.println("Student creation failed due to invalid DOB: " + student);
    }

    @Test
    void testInvalidRegistrationDate() {
        LocalDateTime futureDate = LocalDateTime.now().plusDays(2); // invalid future date

        Student student = StudentFactory.createStudent(
                "Future",
                "Registrant",
                LocalDate.of(2000, 5, 15),
                "Male",
                //"student123",
                futureDate,
                true,
                Student.FundingStatus.FUNDED,
                contact1,
                null
        );

        assertNull(student);
        System.out.println("Student creation failed due to invalid registration date: " + student);
    }

    /*@Test
    void testInvalidPassword() {
        //String invalidPassword = "abc"; // Too short, no digit

        Student student = StudentFactory.createStudent(
                "Invalid",
                "Password",
                LocalDate.of(2000, 1, 1),
                "Non-Binary",
                //invalidPassword,
                LocalDateTime.now(),
                true,
                Student.FundingStatus.NOT_FUNDED,
                contact1,
                null
        );

        assertNull(student);
        System.out.println("Student should be null due to invalid password: " + student);
    }*/
}