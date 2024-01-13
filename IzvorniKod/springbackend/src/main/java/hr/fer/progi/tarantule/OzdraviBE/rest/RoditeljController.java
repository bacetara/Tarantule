package hr.fer.progi.tarantule.OzdraviBE.rest;


import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddMessageDTO;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.GetChildDTO;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.GetParentDTO;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserCache;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/parent/")
public class RoditeljController {

    @Autowired
    private PorukaService porukaService;

    @Autowired
    private OsobaService osobaService;

    @Secured("roditelj")
    @GetMapping(path = "me", produces = MediaType.APPLICATION_JSON_VALUE)
    public GetParentDTO getParent(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        return new GetParentDTO(o, osobaService.findByParent(o.getOib()));
    }

    @Secured("roditelj")
    @PutMapping(path = "newMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addMessage(@RequestBody AddMessageDTO messageData) {
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

    @Secured("roditelj")
    @GetMapping("child/{oib}")
    public GetChildDTO findByOibChild(@PathVariable("oib") String oib, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Osoba c = osobaService.findByOib(oib).orElseThrow(() -> new AccessDeniedException("You don't have access to this OIB"));
        if (!c.getUloga().equals("dijete") ||
            !o.getOib().equals(c.getRoditelj().getOib())) {
            throw new AccessDeniedException("You don't have access to this OIB");
        }

        return new GetChildDTO(porukaService.findByOib(oib), c.getDoktor());
    }

    @Secured("roditelj")
    @GetMapping("{oib}")
    public List<Poruka> findByOibParent(@PathVariable("oib") String oib, HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        Osoba p = osobaService.findByOib(oib).orElseThrow(() -> new AccessDeniedException("You don't have access to this OIB"));
        if (!p.getUloga().equals("roditelj") || !o.getOib().equals(p.getOib())) {
            throw new AccessDeniedException("You don't have access to this OIB");
        }

        return porukaService.findByOib(oib);
    }

}
