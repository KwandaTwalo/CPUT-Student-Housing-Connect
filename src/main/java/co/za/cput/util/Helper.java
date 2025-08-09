package co.za.cput.util;

import co.za.cput.domain.business.Booking;
import co.za.cput.domain.users.Student;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Helper {


    public static boolean isNullorEmpty(String str) {
        return str == null || str.isEmpty();
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

    public static boolean isValidDistance(double distance) {
        return distance > 0;
    }

    // Validates that a decimal number is not negative (e.g. rent, total amount).
    public static boolean isValid_DecimalNumber(double decimalNumber) {
        return decimalNumber >= 0;
    }

    public static boolean isValidRating(int rating) {
        return rating >= 1 && rating <= 10;
    }

    public static boolean isValidPostalCode(int postalCode) {
        return postalCode >= 1000 && postalCode <= 9999;
    }

    public static boolean isValid_ReviewDate(LocalDate reviewDate) {
        if (reviewDate == null) {
            return false;
        }

        LocalDate today = LocalDate.now();

        // A review date is valid if it's today or before
        return !reviewDate.isAfter(today);
    }

    // Validates that the given date is not null and is not in the future.
    public static boolean isValidDate(LocalDate date) {
        if (date == null) {
            return false;
        }
        return !date.isAfter(LocalDate.now());
    }

    //It checks that checkOutDate is not Null and allows any date (future or past).
    public static boolean isValidCheckOutDate(LocalDate checkOutDate) {
        return checkOutDate != null;
    }

    // Validates that the timestamp is not null and is not in the future (used for createdAt and updatedAt).
    public static boolean isValidTimestamp(LocalDateTime timestamp) {
        if (timestamp == null) {
            return false;
        }
        return !timestamp.isAfter(LocalDateTime.now());
    }

    // Checks if both dates are not null and that check-in date is before check-out date.
    public static boolean isValidBookingDates(LocalDate checkInDate, LocalDate checkOutDate) {
        if (checkInDate == null || checkOutDate == null) {
            return false;
        }
        return checkInDate.isBefore(checkOutDate);
    }


    //Sinhle

    //Agnes
    public static boolean isValidPhoneNumber(String phoneNumber) {
        if (isNullorEmpty(phoneNumber)) {
            return false;
        }

        //Checks for e.g 0725637252 or +27 72 563...
        String regex = "^(\\+27|0)[6-8][0-9]{8}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }

    public static boolean isValidEmail(String email) {
        if (isNullorEmpty(email)) {
            return false;
        }
        String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isValidPassword(String password) {
        if (isNullorEmpty(password)) {
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
