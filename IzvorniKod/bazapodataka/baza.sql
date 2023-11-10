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
  OIB INT NOT NULL,
  Ime VARCHAR NOT NULL,
  Prezime VARCHAR NOT NULL,
  mail VARCHAR,
  datumRod DATE,
  adresa VARCHAR,
  adminPrava INT NOT NULL,
  lozinka VARCHAR,
  Uloga VARCHAR NOT NULL,
  rodOIB INT,
  dokOIB INT,
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
  priOIB INT NOT NULL,
  pošOIB INT NOT NULL,
  dijagnozaID INT,
  PRIMARY KEY (id),
  FOREIGN KEY (priOIB) REFERENCES Osoba(OIB),
  FOREIGN KEY (pošOIB) REFERENCES Osoba(OIB),
  FOREIGN KEY (dijagnozaID) REFERENCES Bolest(idBolest)
);--data import
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinka,Uloga,rodOIB,dokOIB) values (101,'Iva','Ivić',NULL,'2001-01-01',NULL,0,'lozinka','doktor',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinka,Uloga,rodOIB,dokOIB) values (100,'Ivan','Ivanić',NULL,'2002-10-01',NULL,0,'password','roditelj',NULL,101);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinka,Uloga,rodOIB,dokOIB) values (102,'Roko','Luk',NULL,'2020-10-10',NULL,0,'test','dijete',100,NULL);


