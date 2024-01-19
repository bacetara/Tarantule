package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Bolnica;
import hr.fer.progi.tarantule.OzdraviBE.service.BolnicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hospital")
public class HospitalController {
    @Autowired
    private BolnicaService bolnicaService;

    @Secured({"doktor", "pedijatar", "roditelj"})
    @GetMapping
    public List<Bolnica> getAllHospitals() {
        return bolnicaService.listAll();
    }
}
