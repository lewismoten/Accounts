SET @p0='lewismoten';
SET @p1='lewismoten@gmail.com';
CALL `create_account`(@p0, @p1, @p2); 
SELECT @p2 AS `nonce`;
CALL purge_account(@p0);
