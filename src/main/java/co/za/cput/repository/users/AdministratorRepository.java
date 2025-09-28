package co.za.cput.repository.users;

import co.za.cput.domain.users.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
    Optional<Administrator> findByContact_EmailIgnoreCase(String email);
}
