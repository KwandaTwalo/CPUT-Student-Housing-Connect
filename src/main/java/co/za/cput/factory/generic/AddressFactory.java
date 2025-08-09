package co.za.cput.factory.generic;

import co.za.cput.domain.generic.Address;
import co.za.cput.util.Helper;

public class AddressFactory {

    public static Address createAddress(String streetNumber,
                                        String streetName,
                                        String suburb,
                                        String city,
                                        int postalCode) {
        if (Helper.isNullorEmpty(streetNumber) ||
                Helper.isNullorEmpty(streetName) ||
                Helper.isNullorEmpty(suburb) ||
                Helper.isNullorEmpty(city) ||
                !Helper.isValidPostalCode(postalCode)) {
            return null;
        }

        return new Address.Builder()
                .setStreetNumber(streetNumber)
                .setStreetName(streetName)
                .setSuburb(suburb)
                .setCity(city)
                .setPostalCode(postalCode)
                .build();

    }
}
