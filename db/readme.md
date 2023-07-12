# Account

## Database

### Credentials

List of account credentials

| ID uuid PK/FK -> Account.ID | salt binary(16) | hash binary (16) |
| 00000000-0000-0000-0000-000000000006 | 0x0000000000000000000000000001 | 0x0000000000000000000000000002 |

### Email

Confirmed Email associated with an account

| AccountID unique uuid PK/FK -> Account.ID | email unique varchar(64) indexed |
| 00000000-0000-0000-0000-000000000006 | lewismoten@gmail.com |


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


### /confirm-email
- username=varchar(12)
- nonce=bin(16)
