package co.za.cput.factory.generic;

import co.za.cput.domain.generic.Contact;
import co.za.cput.util.Helper;

import java.util.UUID;

public class ContactFactory {

    public static Contact createContact(String email, String phoneNumber) {

        String contactId = UUID.randomUUID().toString();

        if (!Helper.validateStringDetails(email) || !Helper.validateStringDetails(phoneNumber)) {

            return null;
        }

        return new Contact.Builder()
                .setContactid(contactId)
                .setEmail(email)
                .setPhoneNumber(phoneNumber)
                .build();
    }
}
