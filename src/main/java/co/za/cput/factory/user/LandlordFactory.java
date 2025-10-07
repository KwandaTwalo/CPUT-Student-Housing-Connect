package co.za.cput.factory.user;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.generic.Contact;
import co.za.cput.domain.users.Landlord;
import co.za.cput.util.Helper;

import java.time.LocalDate;
import java.util.List;

public class LandlordFactory {
    public static Landlord createLandlord(String landlordFirstName,
                                          String landlordLastName,
                                          boolean isVerified,
                                          LocalDate dateRegistered,
                                          //String password,
                                          Contact contact,
                                          List<Accommodation> accommodationList
    ) {

        if (Helper.isNullorEmpty(landlordFirstName) ||
                Helper.isNullorEmpty(landlordLastName) ||
                !Helper.isValidDate(dateRegistered)) {
            return null;
        }

        return new Landlord.Builder()
                .setLandlordFirstName(landlordFirstName)
                .setLandlordLastName(landlordLastName)
                .setVerified(isVerified)
                .setDateRegistered(dateRegistered)
                //.setPassword(password)
                .setContact(contact)
                .setAccommodationList(accommodationList)
                .build();
    }
}
