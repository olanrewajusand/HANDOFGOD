$root = 'C:\Users\PC\OneDrive\Documents\ICONNET\ICONET'
Get-ChildItem -Path $root -Recurse -File | Where-Object { $_.Extension -in '.html', '.css', '.js' } | ForEach-Object {
    $file = $_
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $updated = [regex]::Replace($content, '(?i)\bHand of God\b(?!\s+Investment\s+Cooperative)', 'HAND OF GOD CONSTRUCTION COMPANY')
    $updated = $updated.Replace('HAND OF GOD CONSTRUCTION COMPANY LIMITED', 'HAND OF GOD CONSTRUCTION COMPANY')
    $updated = $updated.Replace('HAND OF GOD CONSTRUCTION COMPANY LIMITEDLtd', 'HAND OF GOD CONSTRUCTION COMPANY')
    $updated = $updated.Replace('Hand of God Construction', 'HAND OF GOD CONSTRUCTION COMPANY')
    $updated = $updated.Replace('HAND OF GOD CONSTRUCTION COMPANY LIMITEDHAND OF GOD CONSTRUCTION COMPANY', 'HAND OF GOD CONSTRUCTION COMPANY')
    if ($updated -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.UTF8Encoding]::new($false))
        Write-Output $file.FullName
    }
}
