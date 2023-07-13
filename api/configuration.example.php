?php

// replace the values here with your databases login credentials
// Rename as configuration.php

define( 'DB_HOST',     ini_get("mysqli.default_host") );
define( 'DB_USER',     ini_get("mysqli.default_user")  );
define( 'DB_PASSWORD', ini_get("mysqli.default_pw")  );
define( 'DB_NAME',     '' );
define( 'UI_URL',      '' );
define( 'EMAIL_FROM',  '' );

// Pepper is used to hash passwords before sending them to the database
define( 'PW_PEPPER',   '' );

?>