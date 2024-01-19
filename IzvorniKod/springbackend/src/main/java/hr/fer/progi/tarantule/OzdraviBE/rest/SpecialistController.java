package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Bolest;
import hr.fer.progi.tarantule.OzdraviBE.domain.Bolnica;
import hr.fer.progi.tarantule.OzdraviBE.service.PregledService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialist")
public class SpecialistController {
    @Autowired
    private PregledService pregledService;

    @Secured("roditelj")
    @GetMapping("/{id}")
    public List<Bolnica> getSpecialists(@PathVariable("id") Integer id) {
        return pregledService.findSpecialists(id);
    }
}
