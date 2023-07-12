DROP TABLE IF EXISTS Credentials;

CREATE TABLE Credentials (
  AccountId BINARY(16) NOT NULL COMMENT 'The account identity',
  Salt binary(16) NOT NULL COMMENT 'The salt used for the password',
  Hash binary(16) NOT NULL COMMENT 'The hashed password',
  FOREIGN KEY (AccountId) REFERENCES Accounts (AccountId)
) COMMENT 'Credentials used to login';

ALTER TABLE Credentials 
ADD PRIMARY KEY (AccountId)
COMMENT 'Account can have one active credential';