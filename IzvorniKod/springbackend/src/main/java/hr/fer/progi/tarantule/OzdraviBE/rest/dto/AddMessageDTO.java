package hr.fer.progi.tarantule.OzdraviBE.rest.dto;

public record AddMessageDTO(String naslov, String tijelo,String prilog, String tip, Integer dijagnozaID, String prioib, String posoib) {
}
