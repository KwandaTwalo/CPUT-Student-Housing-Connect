package co.za.cput.factory.user;

import co.za.cput.domain.business.Verification;
import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Administrator;
import co.za.cput.util.Helper;

import java.util.List;

public class AdministratorFactory {

    public static Administrator createAdministrator(String adminFirstName,
                                                    String adminLastName,
                                                    String password,
                                                    Administrator.AdminRoleStatus adminRoleStatus,
                                                    Contact contact,
                                                    List<Verification> verifications) {
        if (Helper.isNullorEmpty(adminFirstName) ||
                Helper.isNullorEmpty(adminLastName) ||
                !Helper.isValidPassword(password)) {
            return null;
        }

        return new Administrator.Builder()
                .setAdminName(adminFirstName)
                .setAdminSurname(adminLastName)
                .setAdminPassword(password)
                .setAdminRoleStatus(adminRoleStatus)
                .setContact(contact)
                .setVerifications(verifications)
                .build();
    }
}
