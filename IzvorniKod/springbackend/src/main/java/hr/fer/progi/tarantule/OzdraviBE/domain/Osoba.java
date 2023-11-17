package hr.fer.progi.tarantule.OzdraviBE.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name="osoba", schema="public")
public class Osoba {
    @Id
    @NotNull
    @Column(columnDefinition = "CHAR(11)")
    private String oib;

    @NotNull
    private String ime;

    @NotNull
    private String prezime;

    private String mail;

    @Column(name = "datumrod")
    private Date datumRod;

    private String adresa;

    @NotNull
    @Column(name = "adminprava")
    private Integer adminPrava;

    @Column(name = "lozinkahash")
    private String lozinkaHash;

    @NotNull
    private String uloga;

    @ManyToOne
    @JoinColumn(name = "rodoib", referencedColumnName = "oib")
    private Osoba roditelj;

    @ManyToOne
    @JoinColumn(name = "dokoib", referencedColumnName = "oib")
    private Osoba doktor;

    public String getOib() {
        return oib;
    }

    public void setOib(String oib) {
        this.oib = oib;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Date getDatumRod() {
        return datumRod;
    }

    public void setDatumRod(Date datumRod) {
        this.datumRod = datumRod;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public Integer getAdminPrava() {
        return adminPrava;
    }

    public void setAdminPrava(Integer adminPrava) {
        this.adminPrava = adminPrava;
    }

    public String getLozinkaHash() {
        return lozinkaHash;
    }

    public void setLozinkaHash(String lozinkaHash) {
        this.lozinkaHash = lozinkaHash;
    }

    public String getUloga() {
        return uloga;
    }

    public void setUloga(String uloga) {
        this.uloga = uloga;
    }

    public Osoba getRoditelj() {
        return roditelj;
    }

    public void setRoditelj(Osoba roditelj) {
        this.roditelj = roditelj;
    }

    public Osoba getDoktor() {
        return doktor;
    }

    public void setDoktor(Osoba doktor) {
        this.doktor = doktor;
    }
}
