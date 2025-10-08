package co.za.cput.service.users.implementation;

import co.za.cput.domain.users.Student;
import co.za.cput.repository.users.StudentRepository;
import co.za.cput.service.users.IStudentService;
import co.za.cput.util.LinkingEntitiesHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements IStudentService {

    private StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student create(Student student) {

        // Step 1: Save the student without bookings to generate an ID
        Student studentWithoutBookings = new Student.Builder()
                .copy(student)
                .setBookings(null)
                .build();

        Student savedStudent = studentRepository.saveAndFlush(studentWithoutBookings); // Now has ID

        // Step 2: Attach bookings with the now-persisted student
        Student studentWithLinkedBookings = LinkingEntitiesHelper.setStudentInBookings(
                new Student.Builder().copy(student).setStudentID(savedStudent.getStudentID()).build()
        );

        // Step 3: Save again with linked bookings
        return studentRepository.saveAndFlush(studentWithLinkedBookings);
    }

    @Override
    public Student read(Long Id) {
        return studentRepository.findById(Id).orElse(null);
    }

    @Override
    public Student update(Student student) {
        // Optional: validate that student exists first
        if (!studentRepository.existsById(student.getStudentID())) {
            return null;
        }

        // Link bookings properly
        Student studentWithLinkedBookings = LinkingEntitiesHelper.setStudentInBookings(student);
        return studentRepository.saveAndFlush(studentWithLinkedBookings);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public void delete(Long Id) {
        studentRepository.deleteById(Id);
    }
}
