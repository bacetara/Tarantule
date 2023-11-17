package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
    @Autowired
    private OsobaService osobaService;

    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @PostMapping(
            path="",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Osoba register(@RequestBody LoginDTO data) {
        if (data.oib() == null || data.password() == null) {
            throw new BadCredentialsException("Invalid credentials");
        }

        Osoba o;
        try {
            o = osobaService.fetch(data.oib());
        }
        catch (EntityNotFoundException e) {
            // OIB doesn't exist in database
            throw new BadCredentialsException("Invalid credentials");
        }

        if (o.getLozinkaHash() != null) {
            // user already registered
            throw new BadCredentialsException("Invalid credentials");
        }

        if (data.password().length() < 5) {
            // password length too short
            throw new BadCredentialsException("Invalid credentials");
        }

        o.setLozinkaHash(passwordEncoder.encode(data.password()));

        return osobaService.updateOsoba(o);
    }
}
