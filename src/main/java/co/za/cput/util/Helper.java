package co.za.cput.util;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Helper {

    //NOTE CODE YOUR HELPER METHODS UNDER YOUR NAME.

    //Kwanda
    public static String generateID() {
        //Generates Id's
        return UUID.randomUUID().toString();
    }

    public static boolean validateStringDetails(String str) {
        // Ensures that none of the fields are empty or null

        if (str != null && !str.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }


    public static boolean validateStudentDateOfBirth(LocalDate dateOfBirth) {
        // Validates the student's date of birth

        if (dateOfBirth == null) {
            return false; //
        }
        // Get the current date
        LocalDate today = LocalDate.now();

        // Calculate the latest acceptable date of birth (student must be at least 16 years old)
        LocalDate minimumDate = today.minusYears(17);

        // Return true if the provided date of birth is before the minimumDate (i.e., student is 17 or older)
        return dateOfBirth.isBefore(minimumDate);
    }

    public static boolean validateRequestDate(Date requestDate) {
        // Check if the requestDate is null
        if (requestDate == null) {
            return false; // Invalid if null
        }

        // Get the current date and time
        Date now = new Date();

        // Check if requestDate is before the current date/time
        if (requestDate.before(now)) {
            return false; // Invalid if the date is in the past
        }

        // If all checks pass, the date is valid
        return true;
    }


    //Sinhle

    //Agnes
    public static boolean isValidPhoneNumber(String phoneNumber) {
        if (validateStringDetails(phoneNumber)) {
            return false;
        }

        //Checks for e.g 0725637252 or +27 72 563...
        String regex = "^(\\+27|0)[6-8][0-9]{8}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }

    public static boolean isValidEmail(String email) {
        if (validateStringDetails(email)) {
            return false;
        }
        String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isValidPassword(String password) {
        if (validateStringDetails(password)) {
            return false;
        }
        //Checks if Password has at least one digit, one letter and is more than 8 characters long and No Special Characters.
        String regex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    //Tandile

    //Siyabonga

    //Ethan

}
