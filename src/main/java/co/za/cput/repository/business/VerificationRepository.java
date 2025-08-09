package co.za.cput.repository.business;
//Firstname: Siyabonga
//Lastname: Jiyane
//Student Number: 222359676

import co.za.cput.domain.business.Verification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends JpaRepository<Verification, Long> {
  
}
