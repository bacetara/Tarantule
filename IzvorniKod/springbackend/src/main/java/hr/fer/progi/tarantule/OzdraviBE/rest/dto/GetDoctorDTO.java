package hr.fer.progi.tarantule.OzdraviBE.rest.dto;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;

import java.util.List;

public record GetDoctorDTO(Osoba doktor, List<Osoba> pacijenti) {
}
