package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddBolovanjeMessageDTO;
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
import java.util.Objects;

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
    @PostMapping(path = "deleteMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteMessage(@RequestBody Integer id, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Poruka p = porukaService.findById(id).orElse(null);
        if (p == null || !Objects.equals(p.getPosoib(), o.getOib())) {
            throw new AccessDeniedException("You don't have access to this message");
        }

        porukaService.deletePoruka(id);
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
