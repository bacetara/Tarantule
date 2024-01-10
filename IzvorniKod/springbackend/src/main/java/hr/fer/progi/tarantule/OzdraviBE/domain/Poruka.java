package hr.fer.progi.tarantule.OzdraviBE.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
@Entity
@Table(name="poruka", schema="public")
public class Poruka {

    @Id
    @NotNull
    private Integer id;

    @NotNull
    private String naslov;

    @NotNull
    private String tijelo;

    private String prilog;

    @NotNull
    private String tip;

    private Integer dijagnozaID;

    @NotNull
    @Column(columnDefinition = "CHAR(11)", name = "prioib")
    private String prioib;

    @NotNull
    @Column(columnDefinition = "CHAR(11)", name = "pošoib")
    private String posoib;



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getTijelo() {
        return tijelo;
    }

    public void setTijelo(String tijelo) {
        this.tijelo = tijelo;
    }

    public String getPrilog() {
        return prilog;
    }

    public void setPrilog(String prilog) {
        this.prilog = prilog;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public Integer getDijagnozaID() {
        return dijagnozaID;
    }

    public void setDijagnozaID(Integer dijagnozaID) {
        this.dijagnozaID = dijagnozaID;
    }

    public String getPrioib() {
        return prioib;
    }

    public void setPrioib(String prioib) {
        this.prioib = prioib;
    }

    public String getPosoib() {
        return posoib;
    }

    public void setPosoib(String posoib) {
        this.posoib = posoib;
    }


}
