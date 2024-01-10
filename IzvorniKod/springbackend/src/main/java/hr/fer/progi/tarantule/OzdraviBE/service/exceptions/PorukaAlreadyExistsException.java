package hr.fer.progi.tarantule.OzdraviBE.service.exceptions;

import java.io.Serial;

public class PorukaAlreadyExistsException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 10L;

    public PorukaAlreadyExistsException() {

    }

    public PorukaAlreadyExistsException(String message) {
        super(message);
    }
}
