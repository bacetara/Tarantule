package hr.fer.progi.tarantule.OzdraviBE.rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class LoginController {

    @GetMapping("")
    public String hello() {
        return "hello world!";
    }
}
