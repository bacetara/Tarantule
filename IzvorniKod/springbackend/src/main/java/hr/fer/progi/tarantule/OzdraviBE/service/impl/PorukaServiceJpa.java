package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.PorukaRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.PorukaAlreadyExistsException;
import hr.fer.progi.tarantule.OzdraviBE.service.PorukaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class PorukaServiceJpa implements PorukaService {
    @Autowired
    private PorukaRepository porukaRepository;

    @Autowired
    private OsobaService osobaService;

    public List<Poruka> listAll() {
        return porukaRepository.findAll();
    }

    public Poruka fetch(Integer id) {
        return findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No such Poruka with id=" + id));
    }

    public Optional<Poruka> findById(Integer id) {
        return porukaRepository.findById(id);
    }

    public Poruka updatePoruka(Poruka poruka) {
        validate(poruka);

        return porukaRepository.save(poruka);
    }

    public Poruka deletePoruka(Integer id) {
        Poruka p = fetch(id);
        porukaRepository.delete(p);
        return p;
    }

    public Poruka createPoruka(Poruka poruka) {
        validate(poruka);

        return porukaRepository.save(poruka);
    }

    public List<Poruka> findByType(String type) {
        return porukaRepository.findByType(type);
    }

    @Override
    public List<Poruka> findBySender(String senderOIB) {
        return porukaRepository.findBySender(senderOIB);
    }

    @Override
    public List<Poruka> findByRecipient(String recipientOIB) {
        return porukaRepository.findByRecipient(recipientOIB);
    }

    @Override
    public List<Poruka> findByOib(String OIB) {
        return porukaRepository.findByOib(OIB);
    }

    @Override
    public List<Poruka> findBetween(String oib1, String oib2) {
        return porukaRepository.findBetweenPersons(oib1, oib2);
    }

    public List<Poruka> findReceivedFromDoctors(String oib) {
        return porukaRepository.findReceivedFromDoctors(oib);
    }

    private void validate(Poruka poruka) {
        Assert.hasText(poruka.getNaslov(), "Message must have a title");
        Assert.notNull(poruka.getPosoib(), "Message must have sender OIB");
        Assert.notNull(poruka.getPrioib(), "Message must have recipient OIB");
        Assert.hasText(poruka.getTijelo(), "Message must have body");
        Assert.hasText(poruka.getTip(), "Message must have type");

        int type = 0;
        try {
            type = Integer.parseInt(poruka.getTip());
        }
        catch (NumberFormatException ex) {
            Assert.isTrue(false, "Invalid message type");
        }

        Assert.isTrue(type <= 6 && type >= 1, "Invalid message type");

        Assert.isTrue(osobaService.findByOib(poruka.getPosoib()).isPresent(), "Invalid sender OIB");
        Assert.isTrue(osobaService.findByOib(poruka.getPrioib()).isPresent(), "Invalid recipient OIB");
    }
}
