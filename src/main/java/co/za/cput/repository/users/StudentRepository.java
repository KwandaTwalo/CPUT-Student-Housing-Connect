package co.za.cput.repository.users;

import co.za.cput.domain.users.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findFirstByContact_EmailIgnoreCase(String email);

    boolean existsByContact_EmailIgnoreCase(String email);
}
