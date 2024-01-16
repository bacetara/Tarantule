package hr.fer.progi.tarantule.OzdraviBE.dao;

import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PorukaRepository extends JpaRepository<Poruka, Integer> {
    @Query("select p from Poruka p where p.tip = :type")
    List<Poruka> findByType(@Param("type") String type);

    @Query("select p from Poruka p where p.posoib = :oib")
    List<Poruka> findBySender(@Param("oib") String senderOIB);

    @Query("select p from Poruka p where p.prioib = :oib")
    List<Poruka> findByRecipient(@Param("oib") String recipientOIB);

    @Query("select p from Poruka p where p.prioib  = :oib or p.posoib  = :oib")
    List<Poruka> findByOib(@Param("oib") String recipientOIB);

    @Query("select p from Poruka p where (p.prioib = :oib1 and p.posoib = :oib2) or (p.prioib = :oib2 and p.posoib = :oib1)")
    List<Poruka> findBetweenPersons(@Param("oib1") String oib1, @Param("oib2") String oib2);

    @Query("select p from Poruka p join Osoba o on p.posoib = o.oib where p.prioib = :oib and (o.uloga = 'pedijatar' or o.uloga = 'doktor')")
    List<Poruka> findReceivedFromDoctors(@Param("oib") String oib);
}
