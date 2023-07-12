-- Purge acccount from system

DROP PROCEDURE IF EXISTS purge_account;

DELIMITER $$

CREATE PROCEDURE purge_account(
  IN accountName VARCHAR(64)
)
BEGIN

	START TRANSACTION;

    DELETE FROM Tokens WHERE AccountId IN (
      SELECT AccountId from Accounts where AccountName = accountName
    );

    DELETE FROM Accounts WHERE AccountName = accountName;

	COMMIT;

END $$

DELIMITER ;
