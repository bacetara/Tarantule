package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.*;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import hr.fer.progi.tarantule.OzdraviBE.service.PorukaService;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.InvalidAuthorizationException;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.NoSuchOsobaException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/doctor/")
public class LijecnikController {

    @Autowired
    private PorukaService porukaService;

    @Autowired
    private OsobaService osobaService;

    @Secured("doktor")
    @GetMapping("viewPerson/{oib}")
    public Osoba getOsoba(@PathVariable("oib") String oib, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Osoba res = osobaService.findByOib(oib).orElse(null);
        if (res == null) {
            throw new EntityNotFoundException("OIB doesn't exist");
        }

        if (!Objects.equals(res.getDoktor().getOib(), o.getOib())) {
            throw new AccessDeniedException("You don't have access to this person");
        }

        return res;
    }

    @Secured("doktor")
    @PutMapping(path = "newMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addMessage(@RequestBody AddMessageDTO messageData, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Poruka p = new Poruka();
        p.setNaslov(messageData.naslov());
        p.setTijelo(messageData.tijelo());
        p.setPrilog(messageData.prilog());
        p.setTip(messageData.tip());
        p.setDijagnozaID(messageData.dijagnozaID());
        p.setPrioib(messageData.prioib());
        p.setPosoib(messageData.posoib());

        if (!Objects.equals(p.getPosoib(), o.getOib())) {
            throw new AccessDeniedException("You can't send messages as another person");
        }

        if (osobaService.findByOib(p.getPrioib()).isEmpty()) {
            throw new EntityNotFoundException("Invalid recipient OIB");
        }

        porukaService.createPoruka(p);
    }

    @Secured("doktor")
    @PostMapping(path = "markMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void markMessage(@RequestBody MarkMessageDTO data, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Poruka p = porukaService.findById(data.id()).orElse(null);
        if (p == null || (!Objects.equals(p.getPosoib(), o.getOib()) && !Objects.equals(p.getPrioib(), o.getOib()))) {
            throw new AccessDeniedException("You don't have access to this message");
        }

        p.setTip(String.valueOf(data.type()));

        porukaService.updatePoruka(p);
    }

    @Secured("doktor")
    @GetMapping("me")
    public GetDoctorDTO getDoctor(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        return new GetDoctorDTO(o, osobaService.findByDoctor(o.getOib()));
    }

    @Secured("doktor")
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
    @GetMapping("inbox/internal")
    public List<Poruka> findDoctorMessages(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        return porukaService.findReceivedFromDoctors(o.getOib());
    }

    @Secured("doktor")
    @PutMapping(path = "enable", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void enable(@RequestBody AddBolovanjeMessageDTO messageData, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Poruka p = new Poruka();
        p.setNaslov("Bolovanje");
        p.setTijelo("Dopušteno bolovanje i ovaj mail je službena potvrda.");
        p.setPrilog(null);
        p.setTip("3");
        p.setDijagnozaID(null);
        p.setPrioib(messageData.prioib());
        p.setPosoib(messageData.posoib());

        if (!Objects.equals(p.getPosoib(), o.getOib())) {
            throw new AccessDeniedException("You can't send messages as another person");
        }

        if (osobaService.findByOib(p.getPrioib()).isEmpty()) {
            throw new EntityNotFoundException("Invalid recipient OIB");
        }

        porukaService.createPoruka(p);
    }
}
