package hr.fer.progi.tarantule.OzdraviBE.service.impl;

import hr.fer.progi.tarantule.OzdraviBE.dao.PregledRepository;
import hr.fer.progi.tarantule.OzdraviBE.domain.Bolest;
import hr.fer.progi.tarantule.OzdraviBE.domain.Bolnica;
import hr.fer.progi.tarantule.OzdraviBE.service.PregledService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PregledServiceJpa implements PregledService {
    @Autowired
    private PregledRepository pregledRepository;

    @Override
    public List<Bolnica> findSpecialists(Integer id) {
        return pregledRepository.findSpecialists(id);
    }
}
