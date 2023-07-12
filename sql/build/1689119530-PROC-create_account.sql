-- Create acccount and nonce token to verify email

DROP PROCEDURE IF EXISTS create_account;

DELIMITER $$

CREATE PROCEDURE create_account(
  IN accountName VARCHAR(64),
  IN email VARCHAR(64),
  OUT nonce BINARY(16)
)
BEGIN

	DECLARE accountId BINARY(16);   

	SET accountId = uuid_to_bin(UUID());
    SET nonce = uuid_to_bin(UUID());

	START TRANSACTION;

	INSERT INTO Accounts (
        AccountId,
        AccountName
    ) VALUES (
        accountId,
        accountName
    );

    INSERT INTO Tokens (
        Accountid,
        Email,
        TokenTypeId,
        Nonce
    ) SELECT
        accountId,
        email,
        TokenTypeId,
        nonce
    FROM
        TokenTypes
    WHERE
        TokenTypeName = 'Reset Email';

	COMMIT;

END $$

DELIMITER ;
SET @p0='lewismoten'; SET @p1='lewismoten@gmail.com'; CALL `create_account`(@p0, @p1, @p2); SELECT @p2 AS `nonce`;
