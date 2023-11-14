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
  lozinka VARCHAR,
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
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinka,Uloga,rodOIB,dokOIB) values ('12345678900','Iva','Ivić',NULL,'2001-01-01',NULL,0,'lozinka','doktor',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinka,Uloga,rodOIB,dokOIB) values ('01020304050','Ivan','Ivanić',NULL,'2002-10-01',NULL,0,'password','roditelj',NULL,'12345678900');
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinka,Uloga,rodOIB,dokOIB) values ('75289754123','Roko','Luk',NULL,'2020-10-10',NULL,0,'test','dijete','01020304050',NULL);


