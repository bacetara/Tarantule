package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.InvalidAuthorizationException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/logout")
public class LogoutController {

    @GetMapping
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            throw new InvalidAuthorizationException();
        }

        try {
            request.logout();
        }
        catch (ServletException ignore) {

        }
    }
}
