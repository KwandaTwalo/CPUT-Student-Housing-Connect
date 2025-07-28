package co.za.cput.service.users.implementation;

//Firstname:        Sinhle Xiluva
//LastName:         Mthethwa
//Student Number:   221802797.

import co.za.cput.domain.users.Landlord;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.service.users.ILandLordService;

import java.util.List;

public class LandLordServiceImpl implements ILandLordService {

    private static ILandLordService service;

    private LandLordRepository repository;

    private LandLordServiceImpl() {
        repository = LandLordRepository.getRepository();}

    public static ILandLordService getService() {
        if (service == null) {
            service = new LandLordServiceImpl();
        }
        return service;
    }
    @Override
    public Landlord create (Landlord landlord) {
        return this.repository.create(landlord);
    }
    @Override
    public Landlord read(Long id) {
        return this.repository.read(id);
    }

    @Override
    public Landlord update (Landlord landlord) {
        return this.repository.update(landlord);
    }
    @Override
    public boolean delete (Long id){
        return this.repository.delete(id);
    }
    @Override
    public List<Landlord> getall {
            return this.repository.getAll();
    }

}
