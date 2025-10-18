package co.za.cput.service.users.implementation;

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Student;
import co.za.cput.dto.LoginResponse;
import co.za.cput.service.users.implementation.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthenticationServiceTest {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private StudentServiceImpl studentService;

    @Test
    void loginWithRegisteredStudentSucceeds() {
        Contact contact = new Contact.Builder()
                .setEmail("integration@student.test")
                .setPhoneNumber("0712345678")
                .setAlternatePhoneNumber("0723456789")
                .setIsEmailVerified(false)
                .setIsPhoneVerified(false)
                .setPreferredContactMethod(Contact.PreferredContactMethod.EMAIL)
                .build();

        Student student = new Student.Builder()
                .setStudentName("Integration")
                .setStudentSurname("Test")
                .setDateOfBirth(LocalDate.now().minusYears(20))
                .setGender("Female")
                .setPassword("Password1234")
                .setRegistrationDate(LocalDateTime.now())
                .setIsStudentVerified(false)
                .setFundingStatus(Student.FundingStatus.SELF_FUNDED)
                .setContact(contact)
                .build();

        Student created = studentService.create(student);
        assertNotNull(created.getStudentID());

        LoginResponse response = authenticationService.login("integration@student.test", "Password1234");
        assertTrue(response.isAuthenticated(), "Expected login to succeed");
        assertEquals("STUDENT", response.getRole());
    }
}