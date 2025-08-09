package co.za.cput.service.users.implementation;

import co.za.cput.domain.users.Student;
import co.za.cput.domain.generic.Contact;
import co.za.cput.factory.generic.ContactFactory;
import co.za.cput.factory.user.StudentFactory;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class StudentServiceImplTest {

    @Autowired
    private StudentServiceImpl studentService;

    private static final Contact contact = ContactFactory.createContact(
            "Abigail@yahoo.com", "0712345678", "0723456789", true, true,
            Contact.PreferredContactMethod.EMAIL
    );

    private static Student student = StudentFactory.createStudent(
            "Kwanda", "Twalo", LocalDate.of(2000, 5, 15),
            "Male", "student123", LocalDateTime.now(),
            true, Student.FundingStatus.FUNDED, contact, null
    );

    private static Student studentWithId;

    @Test
    void a_create() {
        Student created = studentService.create(student);
        assertNotNull(created);
        studentWithId = created;
        System.out.println("Created: " + created);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void b_read() {
        Student read = studentService.read(studentWithId.getStudentID());
        assertEquals(studentWithId.getStudentID(), read.getStudentID());
        System.out.println("Read: " + read);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void c_update() {
        Student updated = new Student.Builder()
                .copy(studentWithId)
                .setFundingStatus(Student.FundingStatus.SELF_FUNDED)
                .build();
        studentService.update(updated);
        Student readUpdated = studentService.read(updated.getStudentID());
        assertEquals(Student.FundingStatus.SELF_FUNDED, readUpdated.getFundingStatus());
        System.out.println("Updated: " + readUpdated);
    }

    @Test
    //Transactional So I have added in each method because if I add them in the whole class then the create method
    //pretends to save data to the database, but at the end of the test method it undoes(roll back) all the changes.
    @Transactional
    void d_getAllStudents() {
        List<Student> all = studentService.getAllStudents();
        assertNotNull(all);
        System.out.println("All students: " + all);
    }

    @Test
    void e_delete() {
        studentService.delete(studentWithId.getStudentID());
        assertNull(studentService.read(studentWithId.getStudentID()));
        System.out.println("Deleted: " + studentWithId);
    }
}
