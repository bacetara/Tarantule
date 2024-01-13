package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.PorukaRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.PorukaAlreadyExistsException;
import hr.fer.progi.tarantule.OzdraviBE.service.PorukaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PorukaServiceJpa implements PorukaService {
    @Autowired
    private PorukaRepository porukaRepository;

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
        // todo: ...
        return poruka;
    }

    public Poruka deletePoruka(Integer id) {
        // todo: ...
        return null;
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
    public Integer findMaxId(){
        return porukaRepository.findMaxId();
    }


    private void validate(Poruka poruka) {
        // todo: ...
    }
}
