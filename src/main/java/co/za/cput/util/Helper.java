package co.za.cput.util;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

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

    //Tandile

    //Siyabonga

    //Ethan

}
