package co.za.cput.dto;

public class LandlordVerificationRequest {

    private Long adminId;
    private String adminPassword;
    private boolean approved;

    public LandlordVerificationRequest() {
    }

    public LandlordVerificationRequest(Long adminId, String adminPassword, boolean approved) {
        this.adminId = adminId;
        this.adminPassword = adminPassword;
        this.approved = approved;
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

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
