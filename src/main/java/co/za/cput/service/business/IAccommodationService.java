package co.za.cput.service.business;
//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.service.IService;

import java.util.List;

public interface IAccommodationService extends IService<Accommodation, Long> {
    List<Accommodation> getAllAccommodations();
}