package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private OsobaService osobaService;

    private record LoginData(String oib, String password) {

    }

    private record LoginResponse(String role) {

    }

    @PostMapping(
            path="",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public LoginResponse login(LoginData data) {
        return new LoginResponse("parent");
    }

    @GetMapping("getAll")
    public List<Osoba> getAllOsoba() {
        return osobaService.listAll();
    }
}
