package hr.fer.progi.tarantule.OzdraviBE.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
    @GetMapping("")
    public String getCurrent(HttpServletRequest request, HttpServletResponse response) {
        return ((HttpSessionSecurityContextRepository)LoginController.securityContextRepository).loadContext(new HttpRequestResponseHolder(
                request, response)).getAuthentication().getName();
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        logoutHandler.logout(request, response, ((HttpSessionSecurityContextRepository)LoginController.securityContextRepository).loadContext(new HttpRequestResponseHolder(
                request, response)).getAuthentication());
        return "Logged out";
    }
}
