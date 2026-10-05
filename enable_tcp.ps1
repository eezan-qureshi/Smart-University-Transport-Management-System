Add-Type -AssemblyName "Microsoft.SqlServer.SqlWmiManagement"

$wmi = New-Object Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer
$serverInstance = $wmi.ServerInstances["MSSQLSERVER"]

if ($serverInstance -eq $null) {
    Write-Host "Could not find MSSQLSERVER instance. Checking available instances..."
    $wmi.ServerInstances | ForEach-Object { Write-Host "Instance: $($_.Name)" }
} else {
    $tcp = $serverInstance.ServerProtocols["Tcp"]
    if ($tcp.IsEnabled) {
        Write-Host "TCP/IP is already enabled."
    } else {
        $tcp.IsEnabled = $true
        $tcp.Alter()
        Write-Host "TCP/IP has been enabled."
    }
    
    Write-Host "Restarting SQL Server service..."
    Restart-Service MSSQLSERVER -Force
    Write-Host "Done. SQL Server restarted."
}
