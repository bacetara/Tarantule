package hr.fer.progi.tarantule.OzdraviBE.service;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;

import java.util.List;
import java.util.Optional;

public interface OsobaService {
    List<Osoba> listAll();

    Osoba fetch(String oib);

    Optional<Osoba> findByOib(String oib);

    Osoba updateOsoba(Osoba osoba);
}
