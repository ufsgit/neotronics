$Url = "http://localhost:3502/Requirement_Master/RunUpdateSQL/"
$Response = Invoke-RestMethod -Uri $Url
$Response | ConvertTo-Json | Out-File -FilePath "sql_update_result.txt"
Write-Output "Update Triggered"
