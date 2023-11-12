package hr.fer.progi.tarantule.OzdraviBE.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
public class Osoba {
    @Id
    @NotNull
    private Long oib;

    @NotNull
    private String ime;

    @NotNull
    private String prezime;

    private String mail;

    private Date datumRod;

    private String adresa;

    @NotNull
    private Integer adminPrava;

    private String lozinka;

    @NotNull
    private String uloga;

    /*@ManyToOne
    @JoinColumn(name = "rodOib", referencedColumnName = "oib")
    private Osoba roditelj;

    @ManyToOne
    @JoinColumn(name = "dokOib", referencedColumnName = "oib")
    private Osoba doktor;*/
}
