DROP TABLE IF EXISTS Accounts;

CREATE TABLE Accounts (
  AccountId BINARY(16) NOT NULL PRIMARY KEY COMMENT 'Account Identity',
  AccountName VARCHAR(64) NOT NULL UNIQUE COMMENT 'Account login name'
) COMMENT 'List of accounts';
