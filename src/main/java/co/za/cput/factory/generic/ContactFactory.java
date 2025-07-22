package co.za.cput.factory.generic;

//Firstname:        Tandile
//LastName:         Malifethe
//Student Number:   222602511

import co.za.cput.domain.generic.Contact;
import co.za.cput.util.Helper;

import java.util.UUID;

public class ContactFactory {

    public static Contact createContact(String email, String phoneNumber) {

        if (!Helper.validateStringDetails(email) || !Helper.validateStringDetails(phoneNumber)) {

            return null;
        }

        return new Contact.Builder()
                .setEmail(email)
                .setPhoneNumber(phoneNumber)
                .build();
    }
}
