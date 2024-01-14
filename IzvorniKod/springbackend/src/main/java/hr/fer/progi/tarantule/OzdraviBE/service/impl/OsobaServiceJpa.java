package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.OsobaRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.OsobaAlreadyExistsException;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class OsobaServiceJpa implements OsobaService {
    @Autowired
    private OsobaRepository osobaRepository;

    @Override
    public List<Osoba> listAll() {
        return osobaRepository.findAll();
    }

    @Override
    public List<Osoba> listRegistered() {
        return osobaRepository.listRegistered();
    }



    @Override
    public List<Osoba> findByType(String type) {
        return osobaRepository.findByType(type);
    }

    @Override
    public Optional<Osoba> findByOib(String oib) {
        return osobaRepository.findById(oib);
    }

    @Override
    public List<Osoba> findByParent(String parentOib) {
        return osobaRepository.findOsobaByRoditeljOib(parentOib);
    }

    @Override
    public List<Osoba> findByDoctor(String doctorOib) {
        return osobaRepository.findOsobaByDoktorOib(doctorOib);
    }

    @Override
    public List<Osoba> findUnassigned(String role) {
        return osobaRepository.findOsobaByUlogaAndDoktorNull(role);
    }

    @Override
    public Osoba fetch(String oib) {
        return findByOib(oib)
                .orElseThrow(() -> new EntityNotFoundException("No such Osoba with oib=" + oib));
    }

    @Override
    public Osoba updateOsoba(Osoba osoba) {
        validate(osoba);

        if (!osobaRepository.existsById(osoba.getOib())) {
            throw new EntityNotFoundException("OIB doesn't exist: "+ osoba.getOib());
        }

        return osobaRepository.save(osoba);
    }

    @Override
    public Osoba deleteOsoba(String oib) {
        Osoba o = fetch(oib);
        osobaRepository.delete(o);
        return o;
    }

    @Override
    public Osoba createOsoba(Osoba osoba) {
        validate(osoba);

        if (osobaRepository.existsById(osoba.getOib())) {
            throw new OsobaAlreadyExistsException("OIB already exists: "+ osoba.getOib());
        }

        return osobaRepository.save(osoba);
    }

    private void validate(Osoba osoba) {
        // todo: ...
    }
}
