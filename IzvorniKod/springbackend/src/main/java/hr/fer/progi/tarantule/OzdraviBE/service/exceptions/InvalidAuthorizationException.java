package hr.fer.progi.tarantule.OzdraviBE.service.exceptions;

import java.io.Serial;

public class InvalidAuthorizationException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 10L;

    public InvalidAuthorizationException() {

    }

    public InvalidAuthorizationException(String message) {
        super(message);
    }
}
