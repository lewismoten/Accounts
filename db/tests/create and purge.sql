SET @p0='lewismoten';
SET @p1='lewismoten@gmail.com';
SET @p2='password';
CALL `create_account`(@p0, @p1, @p2, @p3, @p4, @p5); 
SELECT @p3 AS `nonce`, @p4 AS `Success`, @p5 AS `Reason`;
CALL purge_account(@p0);
