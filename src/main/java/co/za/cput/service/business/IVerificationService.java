package co.za.cput.service.business;
//Firstname: Siyabonga
//Lastname: Jiyane
//Student Number: 222359676

import co.za.cput.domain.business.Verification;
import co.za.cput.service.IService;

import java.util.List;

public interface IVerificationService extends IService<Verification, String> {

    List<Verification> findAll();
}