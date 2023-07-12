-- Create function that may be missing on older versions (pre 8.0) of MySQL
-- ie: select @@version = '5.6.41-84.1'

DELIMITER $$

CREATE FUNCTION uuid_to_bin(
    uuid CHAR(36)
) RETURNS BINARY(16)
DETERMINISTIC
BEGIN
    RETURN UNHEX(REPLACE(uuid, '-', ''));
END $$

DELIMITER ;