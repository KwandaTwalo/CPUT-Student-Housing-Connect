package co.za.cput.service.generic.implementation;

import co.za.cput.domain.generic.UserAuthentication;
import co.za.cput.repository.generic.UserAuthenticationRepository;
import co.za.cput.service.generic.IUserAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAuthenticationServiceImpl implements IUserAuthenticationService {

    private UserAuthenticationRepository userAuthenticationRepository;

    @Autowired
    public UserAuthenticationServiceImpl(UserAuthenticationRepository userAuthenticationRepository) {
        this.userAuthenticationRepository = userAuthenticationRepository;
    }

    @Override
    public UserAuthentication create(UserAuthentication userAuthentication) {
        return userAuthenticationRepository.save(userAuthentication);
    }

    @Override
    public UserAuthentication read(Long Id) {
        return userAuthenticationRepository.findById(Id).orElse(null);
    }

    @Override
    public UserAuthentication update(UserAuthentication userAuthentication) {
        return userAuthenticationRepository.save(userAuthentication);
    }

    @Override
    public List<UserAuthentication> getAllUserAuthentications() {
        return userAuthenticationRepository.findAll();
    }

    @Override
    public void delete(Long Id) {
        userAuthenticationRepository.deleteById(Id);
    }
}
