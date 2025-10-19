package co.za.cput.service.generic;

import co.za.cput.domain.generic.UserAuthentication;
import co.za.cput.service.IService;

import java.util.List;

public interface IUserAuthenticationService extends IService<UserAuthentication, Long> {
    List<UserAuthentication> getAllUserAuthentications();
}
