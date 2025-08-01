package co.za.cput.factory.business;
//Firstname: Siyabonga
//Lastname: Jiyane
//Student Number: 222359676
import co.za.cput.domain.business.Verification;
import co.za.cput.util.Helper;

import java.util.Date;
import java.util.UUID;

public class VerificationFactory {

    public static Verification createVerification( Date verificationDate, Verification.VerificationStatus status) {

        if (!Helper.validateRequestDate(verificationDate))  {
            return null;
        }

        return new Verification.Builder()
                .setVerificationDate(verificationDate)
                .setVerificationStatus(status)
                .build();
    }
}


