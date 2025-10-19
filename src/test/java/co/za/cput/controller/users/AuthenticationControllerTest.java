package co.za.cput.controller.users;

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Student;
import co.za.cput.repository.users.StudentRepository;
import co.za.cput.service.users.implementation.StudentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StudentServiceImpl studentService;

    @Autowired
    private StudentRepository studentRepository;

    @BeforeEach
    void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    void loginWithRegisteredStudentReturns200() throws Exception {
        Contact contact = new Contact.Builder()
                .setEmail("rest@student.test")
                .setPhoneNumber("0712345678")
                .setAlternatePhoneNumber("0723456789")
                .setIsEmailVerified(false)
                .setIsPhoneVerified(false)
                .setPreferredContactMethod(Contact.PreferredContactMethod.EMAIL)
                .build();

        Student student = new Student.Builder()
                .setStudentName("Rest")
                .setStudentSurname("Tester")
                .setDateOfBirth(LocalDate.now().minusYears(20))
                .setGender("Female")
                .setPassword("Password1234")
                .setRegistrationDate(LocalDateTime.now())
                .setIsStudentVerified(false)
                .setFundingStatus(Student.FundingStatus.SELF_FUNDED)
                .setContact(contact)
                .build();

        studentService.create(student);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{" +
                                "\"email\":\"rest@student.test\"," +
                                "\"password\":\"Password1234\"" +
                                "}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.authenticated").value(true))
                .andExpect(jsonPath("$.role").value("STUDENT"));
    }
}