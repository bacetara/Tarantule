package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.NoSuchOsobaException;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private OsobaService osobaService;

    @GetMapping("viewPerson/{oib}")
    public Osoba getOsoba(@PathVariable("oib") String oib) {
        try {
            return osobaService.fetch(oib);
        }
        catch (EntityNotFoundException e) {
            throw new NoSuchOsobaException();
        }
    }

    @PostMapping(path = "viewPerson/{oib}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void postOsoba(@PathVariable("oib") String oib, @RequestBody(required = false) Osoba newData) {
        if (osobaService.findByOib(oib).isEmpty()) {
            throw new NoSuchOsobaException();
        }

        if (newData == null || newData.getOib() == null) {
            osobaService.deleteOsoba(oib);
            return;
        }

        osobaService.updateOsoba(newData);
    }

    @GetMapping(path = "listAll")
    public List<Osoba> listAll(@RequestParam(name = "type", required = false) String type) {
        if (type == null) {
            return osobaService.listRegistered();
        }

        return osobaService.findByType(type);
    }
}
