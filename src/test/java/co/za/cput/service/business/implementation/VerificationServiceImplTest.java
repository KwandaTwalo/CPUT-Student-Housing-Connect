package co.za.cput.service.business.implementation;

import co.za.cput.domain.business.Verification;
import co.za.cput.factory.business.VerificationFactory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class VerificationServiceImplTest {

    @Autowired
    private VerificationServiceImpl verificationService;

    private Verification verification1 = VerificationFactory.createVerification(
            LocalDate.of(2025, 6, 29),
            "Documents are not authentic and verified.",
            LocalDateTime.now().minusDays(20),
            LocalDateTime.now(),
            Verification.VerificationStatus.REJECTED,
            null,
            null
    );

    private static Verification verification_with_Id;

    @Test
    void a_create() {
        Verification createdVerification = verificationService.create(verification1);
        assertNotNull(createdVerification);
        System.out.println("created verification: " + createdVerification);
        verification_with_Id = createdVerification;
        assertNotNull(verification_with_Id);
        System.out.println("verification with a Id: " + verification_with_Id);
    }

    @Test
    void b_read() {
        assertNotNull(verification_with_Id);
        Verification readVerification = verificationService.read(verification_with_Id.getVerificationID());
        assertEquals(verification_with_Id.getVerificationID(), readVerification.getVerificationID());
        System.out.println("read verification: " + readVerification);
    }

    @Test
    void c_update() {
        assertNotNull(verification_with_Id);
        Verification updatedVerification = new Verification.Builder()
                .copy(verification_with_Id)
                .setNotes("Verification is still in progress.")
                .setVerificationStatus(Verification.VerificationStatus.PENDING)
                .build();
        verificationService.update(updatedVerification);

        //verify if the object is updated.
        Verification readVerification = verificationService.read(updatedVerification.getVerificationID());
        System.out.println("read if verification is updated: " + readVerification);

        assertEquals("Verification is still in progress.", updatedVerification.getNotes());
        assertEquals(Verification.VerificationStatus.PENDING, updatedVerification.getVerificationStatus());
        System.out.println("Verification is updated: " + updatedVerification);
    }

    @Test
    void d_getAllVerifications() {
        List<Verification> verifications = verificationService.getAllVerifications();
        assertNotNull(verifications);
        System.out.println("verifications: " + verifications);
    }

    @Test
    void e_delete() {
        verificationService.delete(verification_with_Id.getVerificationID());
        assertNull(verificationService.read(verification_with_Id.getVerificationID()));
        System.out.println("verification with a Id is deleted: " + verification_with_Id);
    }
}