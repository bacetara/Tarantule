package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AssignPatientDTO;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.InvalidAuthorizationException;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.NoSuchOsobaException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pediatrician/")
public class PedijatarController {
    @Autowired
    private OsobaService osobaService;

    @Secured("pedijatar")
    @GetMapping("me")
    public List<Osoba> getPatients(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        return osobaService.findByDoctor(o.getOib());
    }

    @Secured("pedijatar")
    @GetMapping("unassigned")
    public List<Osoba> getUnassignedPatients(HttpServletRequest request, HttpServletResponse response) {
        return osobaService.findUnassigned("dijete");
    }

    @Secured("pedijatar")
    @PostMapping("assign")
    public Osoba assignPatient(@RequestBody AssignPatientDTO data, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Osoba patient = osobaService.findByOib(data.oib()).orElseThrow(NoSuchOsobaException::new);

        patient.setDoktor(o);

        return osobaService.updateOsoba(patient);
    }
}
