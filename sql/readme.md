# Account

## Database

### Account

List of accounts

| ID PKey binary(16) | username unique varchar(12) indexed |
| 00000000-0000-0000-0000-000000000006 | lewismoten |


CREATE TABLE Accounts (
  AccountId BINARY(16) PRIMARY KEY,
  AccountName VARCHAR(64) NOT NULL
);

### Credentials

List of account credentials

| ID uuid PK/FK -> Account.ID | salt binary(16) | hash binary (16) |
| 00000000-0000-0000-0000-000000000006 | 0x0000000000000000000000000001 | 0x0000000000000000000000000002 |

### Email

Confirmed Email associated with an account

| AccountID unique uuid PK/FK -> Account.ID | email unique varchar(64) indexed |
| 00000000-0000-0000-0000-000000000006 | lewismoten@gmail.com |

### Tokens

Emailed tokens used to verify email address on account creation, password reset, or changed email

| AccountId unique uuid PK/FK -> Account.ID | TokenTypeId tinyint PK | email | nonce bin(16) | date timestamp indexed |
| 00000000-0000-0000-0000-000000000006 | 2 | lewismoten@gmail.com | 0x0000000000000000000000000004 | 2023-07-01 04:32:00 |

### TokenType
| 1 | Reset Password |
| 2 | Confirm Email |

Note: Cront Job needed to remove tokens older than XX minutes

### TwoFactorAuthentication

Optional two-factor authentication codes to log into account.

| AccountId unique uuid PK/FK -> Account.ID | Code binary(16) |
| 00000000-0000-0000-0000-000000000006 | 0x0000000000000000000000000003 |


## API

### /create
- username=varchar(12)
- email=varchar(64)

Errors:
- invalid email address
- username too short
- username too long
- invalid username
- username already in use
  - select top 1 0 from Account where username = username
- email already in use
  - select top 1 0 from Email where email = email

## --------------------------------------

DELIMITER $$

CREATE PROCEDURE create_account(
  IN name VARCHAR(12),
  IN email VARCHAR(64),
  IN nonce BINARY(16)
)
BEGIN

	declare @AccountId uuid
	set @AccountId = UUID_TO_BIN(UUID());

	START TRANSACTION

	INSERT INTO (AccountId, AccountName) VALUES (@AccountId, account_name);

	INSERT INTO Tokens (Accountid, email, tokenTypeId, nonce) values (@AccountId, email, 2, nonce);

	commit;

END $$

DELIMITER ;
## --------------------------------------

CALL create_account(username, email);


### /confirm-email
- username=varchar(12)
- nonce=bin(16)
