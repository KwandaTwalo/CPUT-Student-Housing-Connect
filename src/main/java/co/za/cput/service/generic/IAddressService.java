package co.za.cput.service.generic;

import co.za.cput.domain.generic.Address;
import co.za.cput.service.IService;

import java.util.List;

public interface IAddressService extends IService<Address, Long> {
    List<Address> getAllAddress();
}
