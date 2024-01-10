package hr.fer.progi.tarantule.OzdraviBE.rest;


import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddChildDTO;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.AddParentDTO;
import hr.fer.progi.tarantule.OzdraviBE.service.NoSuchOsobaException;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parent/")
public class RoditeljController {

    @Autowired
    private OsobaService osobaService;



}
