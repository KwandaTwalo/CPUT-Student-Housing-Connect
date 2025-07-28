package co.za.cput.repository.users;

import co.za.cput.domain.users.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
}
