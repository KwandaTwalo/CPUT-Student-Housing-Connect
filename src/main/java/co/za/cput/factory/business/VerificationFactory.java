package co.za.cput.factory.business;
//Firstname: Siyabonga
//Lastname: Jiyane
//Student Number: 222359676

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.business.Verification;
import co.za.cput.domain.users.Administrator;
import co.za.cput.util.Helper;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class VerificationFactory {

    public static Verification createVerification(LocalDate verificationDate,
                                                  String notes,
                                                  LocalDateTime createAt,
                                                  LocalDateTime updateAt,
                                                  Verification.VerificationStatus status,
                                                  Administrator administrator,
                                                  Accommodation accommodation) {

        if (!Helper.isValidDate(verificationDate) ||
        Helper.isNullorEmpty(notes) ||
        !Helper.isValidTimestamp(createAt) ||
        !Helper.isValidTimestamp(updateAt)) {
            return null;
        }

        return new Verification.Builder()
                .setVerificationDate(verificationDate)
                .setNotes(notes)
                .setCreateAt(createAt)
                .setUpdateAt(updateAt)
                .setVerificationStatus(status)
                .setAdministrator(administrator)
                .setAccommodation(accommodation)
                .build();
    }
}


