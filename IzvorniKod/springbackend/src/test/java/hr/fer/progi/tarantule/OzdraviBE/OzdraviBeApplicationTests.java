package hr.fer.progi.tarantule.OzdraviBE;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.domain.Poruka;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import hr.fer.progi.tarantule.OzdraviBE.service.PorukaService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OzdraviBeApplicationTests {
	@Autowired
	OsobaService osobaService;

	@Autowired
	PorukaService porukaService;

	@Test
	public void testFetchNonexistentOsoba() {
		assertThrows(EntityNotFoundException.class, () -> osobaService.fetch("00000000000"));
	}

	@Test
	public void testFetchExistingOsoba() {
		assertEquals("Iva", osobaService.fetch("12345678900").getIme());
		assertEquals("Ivić", osobaService.fetch("12345678900").getPrezime());
	}

	@Test
	public void testFindOsobaByParentOib() {
		assertEquals(
				List.of("55555666666", "75289754123", "76476024110"),
				osobaService.findByParent("01020304050").stream().map(Osoba::getOib).toList()
		);
	}

	@Test
	public void testCreatePoruka() {
		Poruka p = new Poruka();
		p.setNaslov("test");
		p.setTip("1");
		p.setTijelo("test poruka");
		p.setPosoib("01020304050");
		p.setPrioib("12345678900");

		assertEquals(p, porukaService.createPoruka(p));

		porukaService.deletePoruka(p.getId());
	}

	@Test
	public void testDeletePoruka() {
		Poruka p = new Poruka();
		p.setNaslov("test");
		p.setTip("1");
		p.setTijelo("test poruka");
		p.setPosoib("01020304050");
		p.setPrioib("12345678900");

		int id = porukaService.createPoruka(p).getId();
		assertEquals(p.getId(), porukaService.deletePoruka(id).getId());
		assertThrows(EntityNotFoundException.class, () -> porukaService.fetch(id));
	}

	@Test
	public void testPorukaBetweenPeople() {
		Poruka p = new Poruka();
		p.setNaslov("test");
		p.setTip("1");
		p.setTijelo("test poruka");
		p.setPosoib("01020304050");
		p.setPrioib("12345678900");

		int id = porukaService.createPoruka(p).getId();

		assertTrue(porukaService.findBetween("01020304050", "12345678900").stream().map(Poruka::getId).toList().contains(id));

		porukaService.deletePoruka(p.getId());
	}

	@Test
	public void testFindUnassignedOsoba() {
		Osoba o = new Osoba();
		o.setIme("ime");
		o.setPrezime("prezime");
		o.setOib("87631723612");
		o.setUloga("roditelj");
		o.setDatumRod(new Date());

		if (osobaService.findByOib(o.getOib()).isPresent()) {
			osobaService.deleteOsoba(o.getOib());
		}

		osobaService.createOsoba(o);

		assertTrue(osobaService.findUnassigned("roditelj").stream().map(Osoba::getOib).toList().contains(o.getOib()));

		o.setDoktor(osobaService.fetch("12345678900"));
		osobaService.updateOsoba(o);

		assertFalse(osobaService.findUnassigned("roditelj").stream().map(Osoba::getOib).toList().contains(o.getOib()));

		osobaService.deleteOsoba(o.getOib());
	}
}
