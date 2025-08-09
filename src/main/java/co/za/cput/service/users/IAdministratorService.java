package co.za.cput.service.users;

import co.za.cput.domain.users.Administrator;
import co.za.cput.service.IService;

import java.util.List;

public interface IAdministratorService extends IService<Administrator, Long> {
    List<Administrator> getAllAdministrators();
}
