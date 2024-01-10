package hr.fer.progi.tarantule.OzdraviBE.rest;


import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddMessageDTO;
import hr.fer.progi.tarantule.OzdraviBE.service.PorukaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parent/")
public class RoditeljController {

    @Autowired
    private PorukaService porukaService;

    @PutMapping(path = "newMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addMessage(@RequestBody AddMessageDTO messageData) {
        Poruka p = new Poruka();
        p.setId(messageData.id());
        p.setNaslov(messageData.naslov());
        p.setTijelo(messageData.tijelo());
        p.setPrilog(messageData.prilog());
        p.setDijagnozaID(messageData.dijagnozaID());
        p.setPrioib(messageData.prioib());
        p.setPosoib(messageData.posoib());


        porukaService.createPoruka(p);
    }

}
