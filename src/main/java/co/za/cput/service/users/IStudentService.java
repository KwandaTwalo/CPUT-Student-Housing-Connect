package co.za.cput.service.users;

import co.za.cput.domain.users.Student;
import co.za.cput.service.IService;

import java.util.List;

public interface IStudentService extends IService<Student, Long> {
    List<Student> getAllStudents();
}
