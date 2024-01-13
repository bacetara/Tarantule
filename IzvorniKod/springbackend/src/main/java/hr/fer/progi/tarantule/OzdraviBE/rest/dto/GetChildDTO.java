package hr.fer.progi.tarantule.OzdraviBE.rest.dto;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;

import java.util.List;

public record GetChildDTO(List<Poruka> poruke, Osoba pedijatar) {
}
