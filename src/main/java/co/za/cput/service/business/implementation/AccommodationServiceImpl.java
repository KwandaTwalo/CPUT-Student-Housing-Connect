package co.za.cput.service.business.implementation;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.business.Accommodation;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.service.business.IAccommodationService;
import co.za.cput.service.users.ILandLordService;

import java.util.List;

public class AccommodationServiceImpl implements IAccommodationService {

    private static ILandLordService service;

    private AccommodationRepository repository;

    private AccommodationServiceImpl() {
        repository = AccommodationRepository.getRepository();
    }

    public static IAccommodationService getService() {
        if (service == null) {
            service = new AccommodationServiceImpl();
        }
        return service;
    }

    @Override
    public Accommodation create(Accommodation accommodation) {
        return this.repository.create(accommodation);
    }

    @Override
    public Accommodation raed(Long id){
        return this.repository.read(id);
}

@Override
public Accommodation update(Accommodation accommodation) {
    return this.repository.update(accommodation);
}
@Override
public boolean delete(Long id){
    return this.repository.delete(id);
}
@Override
public List<Accommodation> getall {
        return this.repository.getAll();
    }


        }

