package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.BolestRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Bolest;
import hr.fer.progi.tarantule.OzdraviBE.service.BolestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BolestServiceJpa implements BolestService {
    @Autowired
    private BolestRepository bolestRepository;

    @Override
    public List<Bolest> listAll() {
        return bolestRepository.findAll();
    }
}
