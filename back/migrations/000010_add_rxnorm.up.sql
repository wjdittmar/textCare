CREATE TABLE RXNCONSO
(
   RXCUI             varchar(8) NOT NULL,
   LAT               varchar (3) DEFAULT 'ENG' NOT NULL,
   TS                varchar (1),
   LUI               varchar(8),
   STT               varchar (3),
   SUI               varchar (8),
   ISPREF            varchar (1),
   RXAUI             varchar(8) NOT NULL,
   SAUI              varchar (50),
   SCUI              varchar (50),
   SDUI              varchar (50),
   SAB               varchar (20) NOT NULL,
   TTY               varchar (20) NOT NULL,
   CODE              varchar (50) NOT NULL,
   STR               varchar (3000) NOT NULL,
   SRL               varchar (10),
   SUPPRESS          varchar (1),
   CVF               varchar(50)
);

CREATE TABLE RXNREL
(
   RXCUI1    varchar(8) ,
   RXAUI1    varchar(8),
   STYPE1    varchar(50),
   REL       varchar(4) ,
   RXCUI2    varchar(8) ,
   RXAUI2    varchar(8),
   STYPE2    varchar(50),
   RELA      varchar(100) ,
   RUI       varchar(10),
   SRUI      varchar(50),
   SAB       varchar(20) NOT NULL,
   SL        varchar(1000),
   DIR       varchar(1),
   RG        varchar(10),
   SUPPRESS  varchar(1),
   CVF       varchar(50)
);

CREATE TABLE RXNSAT
(
   RXCUI            varchar(8) ,
   LUI              varchar(8),
   SUI              varchar(8),
   RXAUI            varchar(8),
   STYPE            varchar (50),
   CODE             varchar (50),
   ATUI             varchar(11),
   SATUI            varchar (50),
   ATN              varchar (1000) NOT NULL,
   SAB              varchar (20) NOT NULL,
   ATV              varchar (4000),
   SUPPRESS         varchar (1),
   CVF              varchar (50)
);

CREATE INDEX X_RXNCONSO_STR ON RXNCONSO(STR);
CREATE INDEX X_RXNCONSO_RXCUI ON RXNCONSO(RXCUI);
CREATE INDEX X_RXNCONSO_TTY ON RXNCONSO(TTY);
CREATE INDEX X_RXNCONSO_CODE ON RXNCONSO(CODE);

CREATE INDEX X_RXNSAT_RXCUI ON RXNSAT(RXCUI);
CREATE INDEX X_RXNSAT_ATV ON RXNSAT(ATV);
CREATE INDEX X_RXNSAT_ATN ON RXNSAT(ATN);

CREATE INDEX X_RXNREL_RXCUI1 ON RXNREL(RXCUI1);
CREATE INDEX X_RXNREL_RXCUI2 ON RXNREL(RXCUI2);
CREATE INDEX X_RXNREL_RELA ON RXNREL(RELA);

-- you need to pre-process the input file to remove the trailing '|'
-- and then load the data into the table

\copy RXNCONSO (RXCUI, LAT, TS, LUI, STT, SUI, ISPREF, RXAUI, SAUI, SCUI, SDUI, SAB, TTY, CODE, STR, SRL, SUPPRESS, CVF)
FROM '/Users/wjdittmar/Downloads/RxNorm_full_prescribe_02032025/rrf/RXNCONSO_no_trailing.RRF'
WITH (
  FORMAT csv,
  DELIMITER '|',
  HEADER false
);

\copy RXNREL (RXCUI1, RXAUI1, STYPE1, REL, RXCUI2, RXAUI2, STYPE2, RELA, RUI, SRUI, SAB, SL, DIR, RG, SUPPRESS, CVF)
FROM '/Users/wjdittmar/Downloads/RxNorm_full_prescribe_02032025/rrf/RXNREL_no_trailing.RRF'
WITH (
  FORMAT csv,
  DELIMITER '|',
  HEADER false
);

-- for this file also had to do some manual processing -- there were 3 unterminated single / double quotations
\copy RXNSAT (RXCUI, LUI, SUI, RXAUI, STYPE, CODE, ATUI, SATUI, ATN, SAB, ATV, SUPPRESS, CVF)
FROM '/Users/wjdittmar/Downloads/RxNorm_full_prescribe_02032025/rrf/RXNSAT_no_trailing.RRF'
WITH (
  FORMAT csv,
  DELIMITER '|',
  HEADER false
);
