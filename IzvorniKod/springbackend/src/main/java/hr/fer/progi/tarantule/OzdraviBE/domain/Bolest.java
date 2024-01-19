package hr.fer.progi.tarantule.OzdraviBE.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "bolest", schema = "public")
public class Bolest {
    @Id
    @NotNull
    @Column(name = "idbolest")
    private Integer idBolest;

    @NotNull
    private String naziv;

    public Integer getIdBolest() {
        return idBolest;
    }

    public void setIdBolest(Integer idBolest) {
        this.idBolest = idBolest;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }
}
