package co.za.cput.factory.business;

import co.za.cput.domain.business.Verification;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class VerificationFactoryTest {

    private Verification verification1 = VerificationFactory.createVerification(
            LocalDate.of(2025, 7, 29),
            "Documents are authentic and verified.",
            LocalDateTime.now().minusDays(20),
            LocalDateTime.now(),
            Verification.VerificationStatus.APPROVED,
            null,
            null
    );

    @Test
    void createVerification() {
        assertNotNull(verification1);
        System.out.println("verification1 = " + verification1);
    }

    @Test
    void checkInvalid_Date() {
        Verification verification2 = VerificationFactory.createVerification(
                LocalDate.of(2026, 7, 30),
                "Documents are authentic and verified.",
                LocalDateTime.now().minusDays(20),
                LocalDateTime.now(),
                Verification.VerificationStatus.APPROVED,
                null,
                null
        );
        assertNull(verification2, "Request date is in the future");
        System.out.println("verification2 = " + verification2);
    }

    @Test
    void checkInvalid_DateTime() {
        Verification verification3 = VerificationFactory.createVerification(
                LocalDate.of(2024, 7, 30),
                "Documents are authentic and verified.",
                LocalDateTime.now().plusMonths(12),
                LocalDateTime.now(),
                Verification.VerificationStatus.APPROVED,
                null,
                null
        );
        assertNull(verification3, "createdAt date is in the future");
        System.out.println("verification3 = " + verification3);
    }
}