package co.za.cput.factory.user;

import co.za.cput.domain.users.Administrator;
import co.za.cput.util.Helper;

public class AdministratorFactory {

    public static Administrator createAdministrator(Integer id, String name, String surname, String email, String phoneNumber, String password) {

        if(Helper.validateStringDetails(name)|| Helper.validateStringDetails(surname)|| Helper.validateStringDetails(email)){
            return null;
        }

        if(!(Helper.isValidEmail(email))){
            return null;
        }

        if(!(Helper.isValidPhoneNumber(phoneNumber))){
            return null;
        }

        if(!(Helper.isValidPassword(password))){
            return null;
        }

        return new Administrator.Builder()
                .setName(name)
                .setSurname(surname)
                .setEmail(email)
                .setPhoneNumber(phoneNumber)
                .setPassword(password)
                .build();
    }
}
