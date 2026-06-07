$ErrorActionPreference = "Stop"

$frontendRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$certDirectory = Join-Path $frontendRoot "certs"
$pfxPath = Join-Path $certDirectory "localhost.pfx"
$cerPath = Join-Path $certDirectory "localhost.cer"
$plainPassphrase = if ($env:VITE_DEV_CERT_PASSPHRASE) {
    $env:VITE_DEV_CERT_PASSPHRASE
} else {
    "civicresolver-dev"
}

New-Item -ItemType Directory -Force -Path $certDirectory | Out-Null

$certificate = $null

if (Test-Path $pfxPath) {
    try {
        $certificate = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new(
            $pfxPath,
            $plainPassphrase,
            [System.Security.Cryptography.X509Certificates.X509KeyStorageFlags]::Exportable
        )
    } catch {
        $certificate = $null
    }
}

if (-not $certificate -or $certificate.NotAfter -le (Get-Date).AddDays(30)) {
    $rsa = [System.Security.Cryptography.RSA]::Create(2048)

    try {
        $request = [System.Security.Cryptography.X509Certificates.CertificateRequest]::new(
            "CN=localhost",
            $rsa,
            [System.Security.Cryptography.HashAlgorithmName]::SHA256,
            [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
        )

        $basicConstraints = [System.Security.Cryptography.X509Certificates.X509BasicConstraintsExtension]::new(
            $false,
            $false,
            0,
            $false
        )
        $request.CertificateExtensions.Add($basicConstraints)

        $keyUsage = [System.Security.Cryptography.X509Certificates.X509KeyUsageExtension]::new(
            [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::DigitalSignature -bor
            [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::KeyEncipherment,
            $false
        )
        $request.CertificateExtensions.Add($keyUsage)

        $enhancedKeyUsageOids = New-Object System.Security.Cryptography.OidCollection
        $enhancedKeyUsageOids.Add([System.Security.Cryptography.Oid]::new("1.3.6.1.5.5.7.3.1")) | Out-Null
        $enhancedKeyUsage = [System.Security.Cryptography.X509Certificates.X509EnhancedKeyUsageExtension]::new(
            $enhancedKeyUsageOids,
            $false
        )
        $request.CertificateExtensions.Add($enhancedKeyUsage)

        $subjectAlternativeNames = [System.Security.Cryptography.X509Certificates.SubjectAlternativeNameBuilder]::new()
        $subjectAlternativeNames.AddDnsName("localhost")
        $subjectAlternativeNames.AddIpAddress([System.Net.IPAddress]::Parse("127.0.0.1"))
        $request.CertificateExtensions.Add($subjectAlternativeNames.Build())

        $certificate = $request.CreateSelfSigned(
            [System.DateTimeOffset]::Now.AddDays(-1),
            [System.DateTimeOffset]::Now.AddYears(3)
        )
    } finally {
        $rsa.Dispose()
    }
}

$pfxBytes = $certificate.Export(
    [System.Security.Cryptography.X509Certificates.X509ContentType]::Pfx,
    $plainPassphrase
)
[System.IO.File]::WriteAllBytes($pfxPath, $pfxBytes)

$cerBytes = $certificate.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
[System.IO.File]::WriteAllBytes($cerPath, $cerBytes)

try {
    $trustedCertificate = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new($cerBytes)
    $rootStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "CurrentUser")
    $rootStore.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)

    try {
        $existingTrustedCertificate = $rootStore.Certificates |
            Where-Object { $_.Thumbprint -eq $trustedCertificate.Thumbprint } |
            Select-Object -First 1

        if (-not $existingTrustedCertificate) {
            $rootStore.Add($trustedCertificate)
        }
    } finally {
        $rootStore.Close()
        $trustedCertificate.Dispose()
    }
} catch {
    Write-Warning "Certificate generated, but it could not be added to the CurrentUser root store automatically."
    Write-Warning "You may see a browser warning until you trust $cerPath manually."
}

Write-Host "Local HTTPS certificate is ready."
Write-Host "PFX: $pfxPath"
Write-Host "CER: $cerPath"
