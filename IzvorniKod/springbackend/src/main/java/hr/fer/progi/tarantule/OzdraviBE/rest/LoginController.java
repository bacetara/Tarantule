package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.domain.Osoba;
import hr.fer.progi.tarantule.OzdraviBE.service.OsobaService;
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

    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @PostMapping(
            path="",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void login(@RequestBody LoginDTO data, HttpServletRequest request, HttpServletResponse response) {
        if (data.oib() == null || data.password() == null) {
            throw new BadCredentialsException("Invalid login");
        }

        System.out.println("Starting");

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(data.oib(), data.password()));


        SecurityContext context = securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, request, response);



        System.out.println(authentication.getName());
        /*try {
            o = osobaService.fetch(data.oib());
        }
        catch (EntityNotFoundException e) {
            // OIB doesn't exist
            throw new BadCredentialsException("Invalid login");
        }*/

        /*System.out.println("Soo for " + data.oib());
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(data.oib(), data.password());
        Authentication authenticationResponse =
                this.authenticationManager(userDetailsService(), passwordEncoder()).authenticate(authenticationRequest);
        System.out.println(authenticationResponse.isAuthenticated());
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authenticationResponse);

        System.out.println("Setting context");

        SecurityContextHolder.setContext(context);
        //request.getSession(true).setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);
        System.out.println("Right before the end " + ((MyUserDetails)(context.getAuthentication().getPrincipal())).getOsoba());
        return ((MyUserDetails)(context.getAuthentication().getPrincipal())).getOsoba();*/

    }





    @GetMapping("getAll")
    public List<Osoba> getAllOsoba() {
        return osobaService.listAll();
    }

    @GetMapping("")
    public String getCurrent(HttpServletRequest request, HttpServletResponse response) {
        return ((HttpSessionSecurityContextRepository)securityContextRepository).loadContext(new HttpRequestResponseHolder(
                request, response)).getAuthentication().getName();
    }

    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        System.out.println("In Aut manager");
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
                UserDetails ud = new MyUserDetails(osobaService.fetch(username));
                return ud;
            }


        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    public class MyUserDetails implements UserDetails
    {

        Osoba o;
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            HashSet<GrantedAuthority> hs = new HashSet<>();
            hs.add(new SimpleGrantedAuthority(o.getUloga()));
            return hs;
        }

        public MyUserDetails(Osoba o) {
            this.o = o;
        }

        @Override
        public String getPassword() {
            return o.getLozinkaHash();
        }

        @Override
        public String getUsername() {
            return o.getOib();
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
            return o;
        }
    }


}
