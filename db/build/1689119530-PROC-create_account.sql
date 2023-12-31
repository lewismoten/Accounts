-- Create acccount and nonce token to verify email

DROP PROCEDURE IF EXISTS create_account;

DELIMITER $$

CREATE PROCEDURE create_account(
  IN accountNamex VARCHAR(64),
  IN emailx VARCHAR(64),
  IN passwordx VARCHAR(64),
  OUT nonce INT,
  OUT success BIT,
  OUT reason VARCHAR(64)
)
BEGIN

	DECLARE accountId BINARY(16);

    IF EXISTS (SELECT 0 FROM Accounts WHERE AccountName = accountNamex) THEN
        SET success = 0;
        SET reason = 'Duplicate Account Name';
    ELSEIF EXISTS (SELECT 0 FROM Tokens WHERE Email = emailx) THEN
        SET success = 0;
        SET reason = 'Duplicate Email Address';
    ELSE
        SET success = 1;
        SET accountId = uuid_to_bin(UUID());
        SET nonce = 100000 + FLOOR(RAND() * 899999);

        START TRANSACTION;

        INSERT INTO Accounts (
            AccountId,
            AccountName
        ) VALUES (
            accountId,
            accountNamex
        );

        INSERT INTO Tokens (
            Accountid,
            Email,
            TokenTypeId,
            Nonce
        ) SELECT
            accountId,
            emailx,
            TokenTypeId,
            nonce
        FROM
            TokenTypes
        WHERE
            TokenTypeName = 'Reset Email';

        COMMIT;

    END IF;
END $$

DELIMITER ;
