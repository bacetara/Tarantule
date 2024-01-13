package hr.fer.progi.tarantule.OzdraviBE.service;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;

import java.util.List;
import java.util.Optional;

public interface OsobaService {
    List<Osoba> listAll();

    List<Osoba> listRegistered();

    Osoba fetch(String oib);

    Optional<Osoba> findByOib(String oib);

    Osoba updateOsoba(Osoba osoba);

    Osoba deleteOsoba(String oib);

    Osoba createOsoba(Osoba osoba);

    List<Osoba> findByType(String type);

    List<Osoba> findByParent(String parentOib);
}
