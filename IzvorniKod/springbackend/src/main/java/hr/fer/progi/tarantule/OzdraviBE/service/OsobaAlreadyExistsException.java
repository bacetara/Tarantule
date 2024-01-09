package hr.fer.progi.tarantule.OzdraviBE.service;

import java.io.Serial;

public class OsobaAlreadyExistsException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 10L;

    public OsobaAlreadyExistsException() {

    }

    public OsobaAlreadyExistsException(String message) {
        super(message);
    }
}
