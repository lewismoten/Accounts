DROP TABLE IF EXISTS Tokens;

CREATE TABLE Tokens (
  AccountId BINARY(16) NOT NULL COMMENT 'The account identity',
  TokenTypeId TINYINT NOT NULL COMMENT 'The type of token',
  Email varchar(64) NOT NULL COMMENT 'The email address',
  Nonce INT NOT NULL COMMENT 'The token',
  Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When the token was generated',
  FOREIGN KEY (AccountId) REFERENCES Accounts (AccountId),
  FOREIGN KEY (TokenTypeId) REFERENCES TokenTypes (TokenTypeId)
) COMMENT 'Tokens used to verify email address or password reset';

ALTER TABLE Tokens 
ADD PRIMARY KEY (AccountId, TokenTypeId)
COMMENT 'Account can have one of each type of token';

ALTER TABLE Tokens 
ADD INDEX (TokenTypeId)
COMMENT 'The token type must exist';
