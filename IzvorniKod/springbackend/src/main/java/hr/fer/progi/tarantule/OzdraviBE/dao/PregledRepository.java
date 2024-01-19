package hr.fer.progi.tarantule.OzdraviBE.dao;

import hr.fer.progi.tarantule.OzdraviBE.domain.Bolest;
import hr.fer.progi.tarantule.OzdraviBE.domain.Bolnica;
import hr.fer.progi.tarantule.OzdraviBE.domain.Pregled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PregledRepository extends JpaRepository<Pregled, Pregled.PregledId> {
    @Query("select p.pregledId.bolnica from Pregled p where p.pregledId.bolest.idBolest = :id")
    List<Bolnica> findSpecialists(@Param("id") Integer idBolest);
}
