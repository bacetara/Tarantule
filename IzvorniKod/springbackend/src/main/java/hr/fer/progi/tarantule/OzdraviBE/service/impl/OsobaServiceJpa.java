package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.OsobaRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OsobaServiceJpa implements OsobaService {
    @Autowired
    private OsobaRepository osobaRepository;

    @Override
    public List<Osoba> listAll() {
        return osobaRepository.findAll();
    }
}
