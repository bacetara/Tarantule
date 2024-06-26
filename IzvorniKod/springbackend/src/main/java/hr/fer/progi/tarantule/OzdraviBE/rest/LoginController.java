package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.rest.dto.LoginDTO;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.InvalidAuthorizationException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private OsobaService osobaService;

    public static SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

    AuthenticationManager authenticationManager = authenticationManager(userDetailsService(), passwordEncoder());

    @GetMapping("currentRole")
    public String getCurrentRole(HttpServletRequest request, HttpServletResponse response) {
        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            return "";
        }

        return o.getUloga();
    }

    @PostMapping(
            path="",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Osoba login(@RequestBody LoginDTO data, HttpServletRequest request, HttpServletResponse response) {
        if (data.oib() == null || data.password() == null) {
            throw new BadCredentialsException("Invalid login");
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(data.oib(), data.password()));

        SecurityContext context = securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, request, response);

        Osoba o = SecurityHelper.getAuthenticatedOsoba(request);
        if (o == null) {
            System.out.println("ne valja");
            return null;
        }
        else {
            return o;
        }
    }

    @GetMapping("")
    public String getCurrent(HttpServletRequest request, HttpServletResponse response) {
        try {
            return ((HttpSessionSecurityContextRepository) securityContextRepository).loadContext(
                    new HttpRequestResponseHolder(request, response)).getAuthentication().getName();
        }
        catch (NullPointerException e) {
            return "unauthorized";
        }
    }

    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {

        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);

        ProviderManager providerManager = new ProviderManager(authenticationProvider);
        providerManager.setEraseCredentialsAfterAuthentication(false);

        return providerManager;
    }


    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                UserDetails ud = new MyUserDetails(osobaService.fetch(username), osobaService);
                return ud;
            }


        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public static class MyUserDetails implements UserDetails {
        private final OsobaService osobaService;

        private final String oib;

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            String role = null;
            try {
                role = osobaService.fetch(oib).getUloga();
            }
            catch (EntityNotFoundException ex) {
                throw new BadCredentialsException("User OIB doesn't exist");
            }

            HashSet<GrantedAuthority> hs = new HashSet<>();
            hs.add(new SimpleGrantedAuthority(role));
            return hs;
        }

        public MyUserDetails(Osoba o, OsobaService osobaService) {
            this.oib = o.getOib();
            this.osobaService = osobaService;

            try {
                osobaService.fetch(oib);
            }
            catch (EntityNotFoundException ex) {
                throw new BadCredentialsException("User OIB doesn't exist");
            }
        }

        @Override
        public String getPassword() {
            try {
                return osobaService.fetch(oib).getLozinkaHash();
            }
            catch (EntityNotFoundException ex) {
                throw new BadCredentialsException("User OIB doesn't exist");
            }
        }

        @Override
        public String getUsername() {
            return oib;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

        public Osoba getOsoba() {
            try {
                return osobaService.fetch(oib);
            }
            catch (EntityNotFoundException ex) {
                throw new BadCredentialsException("User OIB doesn't exist");
            }
        }
    }
}
