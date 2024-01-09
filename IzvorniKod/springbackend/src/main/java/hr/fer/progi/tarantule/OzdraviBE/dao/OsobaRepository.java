package hr.fer.progi.tarantule.OzdraviBE.dao;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.function.Function;

public interface OsobaRepository extends JpaRepository<Osoba, String> {
    @Query("select o from Osoba o where o.uloga = :type")
    List<Osoba> findByType(@Param("type") String type);

    @Query("select o from Osoba o where o.lozinkaHash != null")
    List<Osoba> listRegistered();
}
