package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.BolnicaRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Bolnica;
import hr.fer.progi.tarantule.OzdraviBE.service.BolnicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BolnicaServiceJpa implements BolnicaService {
    @Autowired
    private BolnicaRepository bolnicaRepository;

    @Override
    public List<Bolnica> listAll() {
        return bolnicaRepository.findAll();
    }
}
