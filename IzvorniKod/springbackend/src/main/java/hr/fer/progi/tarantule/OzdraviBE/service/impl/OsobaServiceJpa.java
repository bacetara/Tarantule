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
        return osobaRepository.findAllOrdered();
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
        return osobaRepository.findOsobaByRoditeljOibOrderByPrezimeAscImeAsc(parentOib);
    }

    @Override
    public List<Osoba> findByDoctor(String doctorOib) {
        return osobaRepository.findOsobaByDoktorOibOrderByPrezimeAscImeAsc(doctorOib);
    }

    @Override
    public List<Osoba> findUnassigned(String role) {
        return osobaRepository.findOsobaByUlogaAndDoktorNullOrderByPrezimeAscImeAsc(role);
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
        Assert.hasText(osoba.getIme(), "Person must have non-empty first name");
        Assert.hasText(osoba.getPrezime(), "Person must have non-empty last name");
        Assert.isTrue(osoba.getOib().matches("\\d{11}"), "OIB must have 11 digits");

        if (osoba.getMail() != null) {
            Assert.isTrue(osoba.getMail().matches(
                    "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])"
            ), "E-mail is not valid");
        }

        Assert.isTrue(
                List.of("roditelj", "admin", "doktor", "dijete", "pedijatar").contains(osoba.getUloga()),
                "Role is not valid"
        );
        Assert.notNull(osoba.getDatumRod(), "Birth date must not be null");
    }
}
