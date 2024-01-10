package hr.fer.progi.tarantule.OzdraviBE.service;

import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;

import java.util.List;
import java.util.Optional;


public interface PorukaService {
    List<Poruka> listAll();

    Poruka fetch(String iid);

    Optional<Poruka> findById(String id);

    Poruka updatePoruka(Poruka poruka);

    Poruka deletePoruka(String id);

    Poruka createPoruka(Poruka poruka);

    List<Poruka> findByType(String type);
}
