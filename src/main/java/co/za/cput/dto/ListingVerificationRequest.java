package co.za.cput.dto;

import co.za.cput.domain.business.Verification;

public class ListingVerificationRequest {

    private Long adminId;
    private String adminPassword;
    private Verification.VerificationStatus status;
    private String notes;

    public ListingVerificationRequest() {
    }

    public ListingVerificationRequest(Long adminId, String adminPassword,
                                      Verification.VerificationStatus status, String notes) {
        this.adminId = adminId;
        this.adminPassword = adminPassword;
        this.status = status;
        this.notes = notes;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public Verification.VerificationStatus getStatus() {
        return status;
    }

    public void setStatus(Verification.VerificationStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
