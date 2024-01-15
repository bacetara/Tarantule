package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Bolest;
import hr.fer.progi.tarantule.OzdraviBE.service.BolestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/diagnosis")
public class DiagnosisController {
    @Autowired
    private BolestService bolestService;

    @Secured({"doktor", "pedijatar"})
    @GetMapping
    public List<Bolest> getAllDiagnoses() {
        return bolestService.listAll();
    }
}
