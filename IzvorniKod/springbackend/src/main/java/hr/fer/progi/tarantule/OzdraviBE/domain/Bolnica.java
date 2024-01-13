package hr.fer.progi.tarantule.OzdraviBE.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "bolnica", schema = "public")
public class Bolnica {
    @Id
    @NotNull
    @Column(name = "idbolnica")
    private Integer idBolnica;

    @NotNull
    private String naziv;

    @NotNull
    @Column(name = "adresabolnice")
    private String adresaBolnice;

    public Integer getIdBolnica() {
        return idBolnica;
    }

    public void setIdBolnica(Integer idBolnica) {
        this.idBolnica = idBolnica;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getAdresaBolnice() {
        return adresaBolnice;
    }

    public void setAdresaBolnice(String adresaBolnice) {
        this.adresaBolnice = adresaBolnice;
    }
}
