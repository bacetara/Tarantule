package hr.fer.progi.tarantule.OzdraviBE.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

public class NoSuchOsobaException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 10L;

    public NoSuchOsobaException() {

    }

    public NoSuchOsobaException(String message) {
        super(message);
    }
}
