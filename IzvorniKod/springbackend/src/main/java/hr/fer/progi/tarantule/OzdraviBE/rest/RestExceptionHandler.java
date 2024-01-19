package hr.fer.progi.tarantule.OzdraviBE.rest;

import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.InvalidAuthorizationException;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.NoSuchOsobaException;
import hr.fer.progi.tarantule.OzdraviBE.service.exceptions.OsobaAlreadyExistsException;
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
        properties.put("message", "Invalid credentials");
        properties.put("status", "400");
        properties.put("error", "Bad request");
        return new ResponseEntity<>(properties, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidAuthorizationException.class)
    protected ResponseEntity<?> handleInvalidAuth(Exception e, WebRequest req) {
        Map<String, String> properties = new HashMap<>();
        properties.put("message", "Invalid authentication");
        properties.put("status", "400");
        properties.put("error", "Bad request");
        return new ResponseEntity<>(properties, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<?> handleIllegalData(Exception e, WebRequest req) {
        Map<String, String> properties = new HashMap<>();
        properties.put("message", e.getMessage());
        properties.put("status", "400");
        properties.put("error", "Bad request");
        return new ResponseEntity<>(properties, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<?> handleEntityNotFound(Exception e, WebRequest req) {
        Map<String, String> properties = new HashMap<>();
        properties.put("message", "Requested entity does not exist");
        properties.put("status", "400");
        properties.put("error", "Bad request");
        return new ResponseEntity<>(properties, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OsobaAlreadyExistsException.class)
    protected ResponseEntity<?> handleOsobaAlreadyExists(Exception e, WebRequest req) {
        Map<String, String> properties = new HashMap<>();
        properties.put("message", "Person already exists");
        properties.put("status", "400");
        properties.put("error", "Bad request");
        return new ResponseEntity<>(properties, HttpStatus.BAD_REQUEST);
    }
}
