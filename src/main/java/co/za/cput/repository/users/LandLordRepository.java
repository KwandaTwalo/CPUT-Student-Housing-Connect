package co.za.cput.repository.users;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LandLordRepository extends JpaRepository<Landlord, Long> {
    Optional<Landlord> findFirstByContact_EmailIgnoreCase(String email);

    boolean existsByContact_EmailIgnoreCase(String email);
    long countByIsVerifiedTrue();
}
