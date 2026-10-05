$regPath = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQLServer\SuperSocketNetLib\Tcp"
reg add "$regPath" /v Enabled /t REG_DWORD /d 1 /f
net stop MSSQLSERVER
net start MSSQLSERVER
Write-Host "Done!"
