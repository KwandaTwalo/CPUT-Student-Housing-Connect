package co.za.cput.service.users.implementation;

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Student;
import co.za.cput.repository.users.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthenticationServiceDuplicateTest {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private StudentServiceImpl studentService;

    @Autowired
    private StudentRepository studentRepository;

    @BeforeEach
    void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    void loginWithDuplicateEmailsDoesNotThrow() {
        Contact contact = new Contact.Builder()
                .setEmail("duplicate@student.test")
                .setPreferredContactMethod(Contact.PreferredContactMethod.EMAIL)
                .build();

        Student baseStudent = new Student.Builder()
                .setStudentName("Duplicate")
                .setStudentSurname("Test")
                .setDateOfBirth(LocalDate.now().minusYears(20))
                .setGender("Female")
                .setPassword("Password1234")
                .setRegistrationDate(LocalDateTime.now())
                .setIsStudentVerified(false)
                .setFundingStatus(Student.FundingStatus.SELF_FUNDED)
                .setContact(contact)
                .build();

        Student firstStudent = studentService.create(baseStudent);
        assertNotNull(firstStudent.getStudentID());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> studentService.create(baseStudent));
        assertTrue(exception.getMessage().toLowerCase().contains("email"));

        assertDoesNotThrow(() -> authenticationService.login("duplicate@student.test", "Password1234"));
    }
}