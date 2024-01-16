package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddMessageDTO;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AssignPatientDTO;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.GetDoctorDTO;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import hr.fer.progi.tarantule.OzdraviBE.service.PorukaService;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.InvalidAuthorizationException;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.NoSuchOsobaException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pediatrician/")
public class PedijatarController {
    @Autowired
    private OsobaService osobaService;

    @Autowired
    private PorukaService porukaService;

    @Secured("pedijatar")
    @PutMapping(path = "newMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addMessage(@RequestBody AddMessageDTO messageData, HttpServletRequest request, HttpServletResponse response) {
        Poruka p = new Poruka();
        p.setNaslov(messageData.naslov());
        p.setTijelo(messageData.tijelo());
        p.setPrilog(messageData.prilog());
        p.setTip(messageData.tip());
        p.setDijagnozaID(messageData.dijagnozaID());
        p.setPrioib(messageData.prioib());
        p.setPosoib(messageData.posoib());


        porukaService.createPoruka(p);
    }

    @Secured("pedijatar")
    @GetMapping("me")
    public GetDoctorDTO getDoctor(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        return new GetDoctorDTO(o, osobaService.findByDoctor(o.getOib()));
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

    @Secured("pedijatar")
    @GetMapping("inbox/{oib}")
    public List<Poruka> findByOibChild(@PathVariable("oib") String oib, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Osoba p = osobaService.findByOib(oib).orElseThrow(() -> new AccessDeniedException("You don't have access to this OIB"));
        if (!p.getUloga().equals("dijete") || !p.getDoktor().getOib().equals(o.getOib())) {
            throw new AccessDeniedException("You don't have access to this OIB");
        }

        return porukaService.findBetween(o.getOib(), p.getOib());
    }
}
