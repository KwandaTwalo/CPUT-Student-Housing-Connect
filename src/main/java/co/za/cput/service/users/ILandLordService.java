package co.za.cput.service.users;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import co.za.cput.service.IService;

import java.util.List;

public interface ILandLordService extends IService<Landlord, Long> {
    List<Landlord> getAllLandlords();
}
