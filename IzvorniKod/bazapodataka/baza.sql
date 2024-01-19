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
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('34365097959','Domagoj','Hranilović',NULL,'1968-02-12',NULL,1,NULL,'admin',NULL,'12345678900');
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

--doktori bez pacijenata
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('52424925677','Nino','Horvat',NULL,'1975-06-18',NULL,0,NULL,'doktor',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('64375832605','Roko','Adamić',NULL,'1976-01-09',NULL,0,NULL,'doktor',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('59460710627','Nela','Antić',NULL,'1979-11-01',NULL,0,NULL,'doktor',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('16083840799','Barbara','Vlašić',NULL,'1981-08-16',NULL,0,NULL,'doktor',NULL,NULL)
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('03979513475','Marino','Preković',NULL,'1981-09-26',NULL,0,NULL,'doktor',NULL,NULL)
--pedijatri bez pacijenata
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('28551028893','Lorena','Vlastić',NULL,'1981-12-11',NULL,0,NULL,'pedijatar',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('17132209185','Lukas','Jurić',NULL,'1984-09-18',NULL,0,NULL,'pedijatar',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('82448294231','Nina','Perić',NULL,'1986-10-01',NULL,0,NULL,'pedijatar',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('43332760214','Antonio','Košar',NULL,'1986-12-14',NULL,0,NULL,'pedijatar',NULL,NULL);
INSERT INTO Osoba (OIB,Ime,Prezime,mail,datumRod,adresa,adminPrava,lozinkaHash,Uloga,rodOIB,dokOIB) values ('09292348271','Vanja','Vlaković',NULL,'1987-07-22',NULL,0,NULL,'pedijatar',NULL,NULL);

INSERT INTO Bolest(idBolest, naziv) values 
  (1, 'Prijelom kosti'), 
  (2, 'Gripa'),
  (3, 'Migrena'),
  (4, 'Upala pluća'),
  (5, 'Hipertenzija'),
  (6, 'Dijabetes'),
  (7, 'Artritis'),
  (8, 'Astma'),
  (9, 'Depresija'),
  (10, 'Anemija'),
  (11, 'Upala bubrega'),
  (12, 'Upala sinusa'),
  (13, 'Osteoporoza'),
  (14, 'Ciroza jetre'),
  (16, 'Alergijski rinitis'),
  (17, 'Parkinsonova bolest'),
  (18, 'HIV/AIDS'),
  (19, 'Oštećenje vida'),
  (20, 'Epilepsija'),
  (21, 'Autizam'),
  (22, 'Šećerna bolest'),
  (23, 'Reumatoidni artritis'),
  (26, 'Osteoartritis'),
  (27, 'Bipolarni poremećaj'),
  (28, 'Infarkt miokarda'),
  (29, 'Anksioznost'),
  (30, 'Crohnova bolest'),
  (31, 'Poremećaj spavanja');

INSERT INTO Bolnica(idBolnica, naziv, adresaBolnice) values 
  (1, 'Klinički bolnički centar Zagreb', 'Kišpatićeva ul. 12, 10000 Zagreb'),
  (2, 'Klinički bolnički centar Rijeka', 'Krešimirova ul. 42, 51000 Rijeka'),
  (3, 'Klinički bolnički centar Split', 'Spinčićeva ul. 1, 21000 Split'),
  (4, 'Klinički bolnički centar Osijek', 'J. Huttlera 4, 31000 Osijek'),
  (5, 'Opća bolnica Zadar', 'Ul. Bože Peričića 5, 23000 Zadar'),
  (6, 'Opća bolnica Pula', 'Santoriova ul. 24a, 52100 Pula'),
  (7, 'Opća bolnica Dubrovnik', 'Dr. Roka Mišetića 2, 20000 Dubrovnik'),
  (8, 'Opća bolnica Varaždin', 'Ul. Ivana Meštrovića 1, 42000 Varaždin'),
  (9, 'Klinički bolnički centar "Sestre milosrdnice", Zagreb', 'Vinogradska cesta 29, 10000 Zagreb'),
  (10, 'Klinika za dječje bolesti Zagreb (KBC Zagreb)', 'Klaićeva ul. 16, 10000 Zagreb'),
  (11, 'KBC Sveti Duh, Zagreb', 'Sveti Duh 64, 10000 Zagreb'),
  (12, 'KBC Merkur, Zagreb', 'Zajčeva ul. 19, 10000 Zagreb'),
  (13, 'Opća bolnica Karlovac', 'Ul. Andrije Štampara 3, 47000 Karlovac'),
  (14, 'Opća bolnica Vukovar', 'Županijska ul. 35, 32000 Vukovar'),
  (15, 'Opća bolnica Bjelovar', 'Ul. Antuna Mihanovića 8, 43000 Bjelovar'); 
