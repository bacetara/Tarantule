package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private OsobaService osobaService;

    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @PostMapping(
            path="",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Osoba login(@RequestBody LoginDTO data) {
        if (data.oib() == null || data.password() == null) {
            throw new BadCredentialsException("Invalid login");
        }

        Osoba o;
        try {
            o = osobaService.fetch(data.oib());
        }
        catch (EntityNotFoundException e) {
            throw new BadCredentialsException("Invalid login");
        }

        if (passwordEncoder.matches(data.password(), o.getLozinkaHash())) {
            return o;
        }
        else {
            throw new BadCredentialsException("Invalid login");
        }
    }

    @GetMapping("getAll")
    public List<Osoba> getAllOsoba() {
        return osobaService.listAll();
    }
}
