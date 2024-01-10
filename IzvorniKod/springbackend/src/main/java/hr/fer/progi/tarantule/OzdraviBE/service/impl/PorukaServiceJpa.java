package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.PorukaRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
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
        // todo: ...
        return poruka;
    }

    public List<Poruka> findByType(String type) {
        // todo: ...
        return null;
    }

    private void validate(Poruka poruka) {
        // todo: ...
    }
}
