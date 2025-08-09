package co.za.cput.service.business;

import co.za.cput.domain.business.Verification;
import co.za.cput.service.IService;

import java.util.List;

public interface IVerificationService extends IService<Verification, Long> {
    List<Verification> getAllVerifications();
}
