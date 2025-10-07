package co.za.cput.factory.generic;

import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.generic.UserAuthentication;
import co.za.cput.domain.users.Administrator;
import co.za.cput.domain.users.Landlord;
import co.za.cput.domain.users.Student;
import co.za.cput.util.Helper;

public class UserAuthenticationFactory {

    public static UserAuthentication createUserAuthentication(String username,
                                                              String password,
                                                              UserAuthentication.UserRole userRole,
                                                              Contact contact,
                                                              Student student,
                                                              Landlord landlord,
                                                              Administrator administrator) {
        if (Helper.isNullorEmpty(username) ||
        !Helper.isValidPassword(password)) {
            return null;
        }
        return new UserAuthentication.Builder()
                .setUsername(username)
                .setPassword(password)
                .setUserRole(userRole)
                .setContact(contact)
                .setStudent(student)
                .setLandlord(landlord)
                .setAdministrator(administrator)
                .build();
    }
}
