package co.za.cput.factory.generic;

//Firstname:        Tandile
//LastName:         Malifethe
//Student Number:   222602511

import co.za.cput.domain.generic.Contact;
import co.za.cput.util.Helper;

public class ContactFactory {

    public static Contact createContact(String email,
                                        String phoneNumber,
                                        String alternativeNumber,
                                        boolean isEmailVerified,
                                        boolean isPhoneVerified,
                                        Contact.PreferredContactMethod preferredContactMethod) {

        if (!Helper.isValidEmail(email) ||
                !Helper.isValidPhoneNumber(phoneNumber) ||
                !Helper.isValidPhoneNumber(alternativeNumber)) {
            return null;
        }

        return new Contact.Builder()
                .setEmail(email)
                .setPhoneNumber(phoneNumber)
                .setAlternatePhoneNumber(alternativeNumber)
                .setIsEmailVerified(isEmailVerified)
                .setIsPhoneVerified(isPhoneVerified)
                .setPreferredContactMethod(preferredContactMethod)
                .build();
    }
}
