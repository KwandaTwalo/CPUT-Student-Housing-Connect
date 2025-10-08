package co.za.cput.controller.users;

import co.za.cput.dto.LoginRequest;
import co.za.cput.dto.LoginResponse;
import co.za.cput.service.users.implementation.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/HouseConnect/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest == null) {
            return ResponseEntity.badRequest().body(LoginResponse.failure("Login request is required."));
        }

        try {
            Optional<LoginResponse> loginResponse = authenticationService.login(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );

            return loginResponse
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(LoginResponse.failure("Invalid email or password.")));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(LoginResponse.failure(exception.getMessage()));
        }
    }
}
