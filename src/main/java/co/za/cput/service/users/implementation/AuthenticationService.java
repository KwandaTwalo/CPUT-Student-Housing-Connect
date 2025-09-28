package co.za.cput.service.users.implementation;

import co.za.cput.domain.users.Administrator;
import co.za.cput.domain.users.Landlord;
import co.za.cput.domain.users.Student;
import co.za.cput.dto.LoginResponse;
import co.za.cput.repository.users.AdministratorRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.repository.users.StudentRepository;
import co.za.cput.util.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final AdministratorRepository administratorRepository;
    private final LandLordRepository landLordRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public AuthenticationService(AdministratorRepository administratorRepository,
                                 LandLordRepository landLordRepository,
                                 StudentRepository studentRepository) {
        this.administratorRepository = administratorRepository;
        this.landLordRepository = landLordRepository;
        this.studentRepository = studentRepository;
    }

    public Optional<LoginResponse> login(String email, String password) {
        if (Helper.isNullorEmpty(email) || Helper.isNullorEmpty(password)) {
            throw new IllegalArgumentException("Email and password are required");
        }

        String normalisedEmail = email.trim();

        Optional<Administrator> administratorOptional = administratorRepository.findByContact_EmailIgnoreCase(normalisedEmail);
        if (administratorOptional.isPresent()) {
            Administrator administrator = administratorOptional.get();
            if (password.equals(administrator.getAdminPassword())) {
                return Optional.of(LoginResponse.successForAdministrator(administrator));
            }
        }

        Optional<Landlord> landlordOptional = landLordRepository.findByContact_EmailIgnoreCase(normalisedEmail);
        if (landlordOptional.isPresent()) {
            Landlord landlord = landlordOptional.get();
            if (password.equals(landlord.getPassword())) {
                return Optional.of(LoginResponse.successForLandlord(landlord));
            }
        }

        Optional<Student> studentOptional = studentRepository.findByContact_EmailIgnoreCase(normalisedEmail);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            if (password.equals(student.getPassword())) {
                return Optional.of(LoginResponse.successForStudent(student));
            }
        }

        return Optional.empty();
    }
}
