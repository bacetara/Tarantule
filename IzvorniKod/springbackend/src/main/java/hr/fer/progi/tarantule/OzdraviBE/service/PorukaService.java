package hr.fer.progi.tarantule.OzdraviBE.service;

import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;

import java.util.List;
import java.util.Optional;


public interface PorukaService {
    List<Poruka> listAll();

    Poruka fetch(Integer id);

    Optional<Poruka> findById(Integer id);

    Poruka updatePoruka(Poruka poruka);

    Poruka deletePoruka(Integer id);

    Poruka createPoruka(Poruka poruka);

    List<Poruka> findByType(String type);

    List<Poruka> findBySender(String senderOIB);

    List<Poruka> findByRecipient(String recipientOIB);

    List<Poruka> findByOib(String OIB);

    Integer findMaxId();
}
