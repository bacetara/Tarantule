package hr.fer.progi.tarantule.OzdraviBE.domain;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "pregled", schema = "public")
public class Pregled {
    @Embeddable
    public static class PregledId implements Serializable {
        @ManyToOne
        @JoinColumn(name = "idbolest", referencedColumnName = "idbolest")
        private Bolest bolest;

        @ManyToOne
        @JoinColumn(name = "idbolnica", referencedColumnName = "idbolnica")
        private Bolnica bolnica;

        public Bolest getBolest() {
            return bolest;
        }

        public void setBolest(Bolest bolest) {
            this.bolest = bolest;
        }

        public Bolnica getBolnica() {
            return bolnica;
        }

        public void setBolnica(Bolnica bolnica) {
            this.bolnica = bolnica;
        }
    }

    @Id
    private PregledId pregledId;

    public PregledId getPregledId() {
        return pregledId;
    }

    public void setPregledId(PregledId pregledId) {
        this.pregledId = pregledId;
    }
}
