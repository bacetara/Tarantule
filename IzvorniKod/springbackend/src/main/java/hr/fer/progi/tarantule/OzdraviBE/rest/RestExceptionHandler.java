package hr.fer.progi.tarantule.OzdraviBE.rest;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    protected ResponseEntity<?> handleInvalidPassword(Exception e, WebRequest req) {
        Map<String, String> properties = new HashMap<>();
        properties.put("message", "Invalid login");
        properties.put("status", "400");
        properties.put("error", "Bad request");
        return new ResponseEntity<>(properties, HttpStatus.BAD_REQUEST);
    }
}
