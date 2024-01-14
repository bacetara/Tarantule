package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddBolovanjeMessageDTO;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddMessageDTO;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import hr.fer.progi.tarantule.OzdraviBE.service.PorukaService;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.InvalidAuthorizationException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor/")
public class LijecnikController {

    @Autowired
    private PorukaService porukaService;

    @Autowired
    private OsobaService osobaService;

    @Secured("doktor")
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

    @Secured("doktor")
    @GetMapping("me")
    public List<Osoba> getPatients(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        return osobaService.findByDoctor(o.getOib());
    }

    @Secured("doktor")
    @GetMapping("unassigned")
    public List<Osoba> getUnassignedPatients(HttpServletRequest request, HttpServletResponse response) {
        return osobaService.findUnassigned("roditelj");
    }

    @Secured("doktor")
    @GetMapping("inbox/{oib}")
    public List<Poruka> findByOibParent(@PathVariable("oib") String oib, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Osoba p = osobaService.findByOib(oib).orElseThrow(() -> new AccessDeniedException("You don't have access to this OIB"));
        if (!p.getUloga().equals("roditelj") || !p.getDoktor().getOib().equals(o.getOib())) {
            throw new AccessDeniedException("You don't have access to this OIB");
        }

        return porukaService.findBetween(o.getOib(), p.getOib());
    }

    @Secured("doktor")
    @PutMapping(path = "enable", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void enable(@RequestBody AddBolovanjeMessageDTO messageData, HttpServletRequest request, HttpServletResponse response) {
        Poruka p = new Poruka();
        p.setNaslov("Bolovanje");
        p.setTijelo("Dopušteno bolovanje i ovaj mail je službena potvrda.");
        p.setPrilog(null);
        p.setTip("3");
        p.setDijagnozaID(null);
        p.setPrioib(messageData.prioib());
        p.setPosoib(messageData.posoib());


        porukaService.createPoruka(p);
    }
}
