# octarestaurant

https://rest123.lovable.app/admin/restaurants 

ALTER USER 'mhmdSalim'@'%'
IDENTIFIED WITH mysql_native_password
BY 'StrongPassword123';

FLUSH PRIVILEGES;










SELECT user, host, plugin 
FROM mysql.user 
WHERE user = 'mhmdSalim';

             
