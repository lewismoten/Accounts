DROP TABLE IF EXISTS TokenTypes;

CREATE TABLE TokenTypes (
  TokenTypeId TINYINT NOT NULL COMMENT 'Identity of Token Type',
  TokenTypeName VARCHAR(64) NOT NULL COMMENT 'Name of the token type'
) COMMENT 'Types of tokens emailed';

ALTER TABLE TokenTypes 
ADD PRIMARY KEY (TokenTypeId)
COMMENT 'Identifier for Token Type';

ALTER TABLE TokenTypes 
ADD UNIQUE(TokenTypeName)
COMMENT 'Token Type names must be unique';

INSERT INTO TokenTypes (TokenTypeId, TokenTypeName) VALUES (1, 'Reset Email');

INSERT INTO TokenTypes (TokenTypeId, TokenTypeName) VALUES (2, 'Reset Password');
