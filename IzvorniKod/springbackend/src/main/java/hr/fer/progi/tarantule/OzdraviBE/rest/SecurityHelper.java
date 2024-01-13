package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.security.Principal;

public class SecurityHelper {
    public static Osoba getAuthenticatedOsoba(HttpServletRequest request) {
        Principal p = request.getUserPrincipal();
        if (!(p instanceof UsernamePasswordAuthenticationToken)) {
            System.out.println("Invalid principal type");
            return null;
        }

        if (!(((UsernamePasswordAuthenticationToken) p).getPrincipal() instanceof LoginController.MyUserDetails)) {
            System.out.println("Invalid user details type");
            return null;
        }

        return ((LoginController.MyUserDetails) ((UsernamePasswordAuthenticationToken) p).getPrincipal()).getOsoba();
    }
}
