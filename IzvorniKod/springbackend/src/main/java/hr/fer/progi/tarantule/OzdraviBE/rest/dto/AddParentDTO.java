package hr.fer.progi.tarantule.OzdraviBE.rest.dto;

import java.util.Date;

public record AddParentDTO(String oib, String ime, String prezime, Date datumRod) {
}
