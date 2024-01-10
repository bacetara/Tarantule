package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddChildDTO;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddParentDTO;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.NoSuchOsobaException;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
    public List<Osoba> listAll(
            @RequestParam(name = "type", required = false) String type,
            @RequestParam(name = "unregistered", defaultValue = "false", required = false) boolean unregistered) {
        if (type == null) {
            return (unregistered ? osobaService.listAll() : osobaService.listRegistered());
        }

        return osobaService.findByType(type).stream().filter((o) -> unregistered || o.getLozinkaHash() != null).toList();
    }

    @PutMapping(path = "addParent", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addParent(@RequestBody AddParentDTO parentData) {
        Osoba o = new Osoba();
        o.setOib(parentData.oib());
        o.setIme(parentData.ime());
        o.setPrezime(parentData.prezime());
        o.setDatumRod(parentData.datumRod());
        o.setUloga("roditelj");

        osobaService.createOsoba(o);
    }

    @PutMapping(path = "addChild", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addChild(@RequestBody AddChildDTO childData) {
        if (childData.rodOib() == null) {
            throw new IllegalArgumentException("Parent OIB must be given!");
        }

        Osoba roditelj = osobaService.findByOib(childData.rodOib()).orElse(null);
        if (roditelj == null) {
            throw new NoSuchOsobaException();
        }

        Osoba o = new Osoba();
        o.setOib(childData.oib());
        o.setIme(childData.ime());
        o.setPrezime(childData.prezime());
        o.setDatumRod(childData.datumRod());
        o.setUloga("dijete");
        o.setRoditelj(roditelj);

        osobaService.createOsoba(o);
    }
}
