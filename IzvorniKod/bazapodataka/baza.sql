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

--doktor pass: lozinka, 3 pacijenta
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('12345678900','Iva','Ivić',NULL,'2001-01-01',NULL,0,'{bcrypt}$2a$10$sPH1dIHBj/sfZ/GV.TOovuXEppH4OpKMJYGMekmFbjK7Bv1EaY.Mu','doktor',NULL,NULL);

--roditelj pass: password, ima doktroa i djecu
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('01020304050','Ivan','Ivanić',NULL,'2002-10-01',NULL,0,'{bcrypt}$2a$10$Uw.wBcBCB5GwdHxynwqRUup3QtGW8pwjJOJ4TxB9G0Hz3vEy4J4fa','roditelj',NULL,'12345678900');

--dijete pass: testtest, ne bi trebao imat šifru jer je dijete, nema pedijatra
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('75289754123','Roko','Luk',NULL,'2020-10-10',NULL,0,'{bcrypt}$2a$10$1Mu63rlA9IZtJ0lMk1iS9.yGnqUoh95VlApCiJT30EuqnALMwfALO','dijete','01020304050',NULL);
--pedijatar bez pacijenata 
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('98602316389','Krešimir','Vukić',NULL,'1995-05-09',NULL,0,NULL,'pedijatar',NULL,NULL);
--ADMIN,roditelj s doktrom bez djece
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('34365097959','Domagoj','Hranilović',NULL,'1968-02-12',NULL,1,NULL,'roditelj',NULL,'12345678900');
--pedijatar s više pacijenata
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('04693058344','Jelena','Markušić',NULL,'1978-03-11',NULL,0,NULL,'pedijatar',NULL,NULL);
--dijete nema pedijatra
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('76476024110','Julija','Zagorac',NULL,'2009-05-07',NULL,0,NULL,'dijete','01020304050',NULL);
--roditelj bez djece i bez doktora
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('88479781796','Ljubica','Vlah',NULL,'1958-02-10',NULL,0,NULL,'roditelj',NULL,NULL);
--roditelj s doktorom i djecom
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('62462866874','Robert','Gojak',NULL,'1995-12-12',NULL,0,NULL,'roditelj',NULL,'12345678900');
--doktor bez pacijenata
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('44272065343','Ivana','Ivaković',NULL,'1985-02-02',NULL,0,NULL,'doktor',NULL,NULL);
--dijete ima pedijatra
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('13544256655','Jumila','Zarac',NULL,'2008-06-07',NULL,0,NULL,'dijete','44272065343','04693058344');
--dijete ima pedijatra
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('09440999985','Ivo','Zarac',NULL,'2006-07-08',NULL,0,NULL,'dijete','44272065343','04693058344');