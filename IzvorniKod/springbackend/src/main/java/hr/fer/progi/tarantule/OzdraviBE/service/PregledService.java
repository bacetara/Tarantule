package hr.fer.progi.tarantule.OzdraviBE.service;

import hr.fer.progi.tarantule.OzdraviBE.domain.Bolest;
import hr.fer.progi.tarantule.OzdraviBE.domain.Bolnica;

import java.util.List;

public interface PregledService {
    List<Bolnica> findSpecialists(Integer id);
}
