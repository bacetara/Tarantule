CREATE TABLE Bolest
(
  idBolest INT NOT NULL,
  naziv VARCHAR NOT NULL,
  PRIMARY KEY (idBolest)
);

CREATE TABLE Bolnica
(
  idBolnica INT NOT NULL,
  naziv VARCHAR NOT NULL,
  adresaBolnice VARCHAR NOT NULL,
  PRIMARY KEY (idBolnica)
);

CREATE TABLE pregled
(
  idBolest INT NOT NULL,
  idBolnica INT NOT NULL,
  PRIMARY KEY (idBolest, idBolnica),
  FOREIGN KEY (idBolest) REFERENCES Bolest(idBolest),
  FOREIGN KEY (idBolnica) REFERENCES Bolnica(idBolnica)
);

CREATE TABLE Osoba
(
  OIB CHAR(11) NOT NULL,
  Ime VARCHAR NOT NULL,
  Prezime VARCHAR NOT NULL,
  mail VARCHAR,
  datumRod DATE,
  adresa VARCHAR,
  adminPrava INT NOT NULL,
  lozinkaHash VARCHAR,
  Uloga VARCHAR NOT NULL,
  rodOIB CHAR(11),
  dokOIB CHAR(11),
  PRIMARY KEY (OIB),
  FOREIGN KEY (rodOIB) REFERENCES Osoba(OIB),
  FOREIGN KEY (dokOIB) REFERENCES Osoba(OIB)
);

CREATE TABLE Poruka
(
  id INT NOT NULL,
  naslov VARCHAR NOT NULL,
  tijelo VARCHAR NOT NULL,
  prilog VARCHAR,
  tip VARCHAR NOT NULL,
  priOIB CHAR(11) NOT NULL,
  pošOIB CHAR(11) NOT NULL,
  dijagnozaID INT,
  PRIMARY KEY (id),
  FOREIGN KEY (priOIB) REFERENCES Osoba(OIB),
  FOREIGN KEY (pošOIB) REFERENCES Osoba(OIB),
  FOREIGN KEY (dijagnozaID) REFERENCES Bolest(idBolest)
);--data import

-- pass: lozinka
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('12345678900','Iva','Ivić',NULL,'2001-01-01',NULL,0,'{bcrypt}$2a$10$sPH1dIHBj/sfZ/GV.TOovuXEppH4OpKMJYGMekmFbjK7Bv1EaY.Mu','doktor',NULL,NULL);

-- pass: password
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('01020304050','Ivan','Ivanić',NULL,'2002-10-01',NULL,0,'{bcrypt}$2a$10$Uw.wBcBCB5GwdHxynwqRUup3QtGW8pwjJOJ4TxB9G0Hz3vEy4J4fa','roditelj',NULL,'12345678900');

-- pass: testtest
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('75289754123','Roko','Luk',NULL,'2020-10-10',NULL,0,'{bcrypt}$2a$10$1Mu63rlA9IZtJ0lMk1iS9.yGnqUoh95VlApCiJT30EuqnALMwfALO','dijete','01020304050',NULL);


