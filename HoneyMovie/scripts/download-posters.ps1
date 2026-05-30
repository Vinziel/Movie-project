# Download all movie posters as JPG via Wikipedia API
$base = Join-Path $PSScriptRoot "..\assets\posters"
$bannerBase = Join-Path $PSScriptRoot "..\assets\banners"
New-Item -ItemType Directory -Force -Path $base, $bannerBase | Out-Null

$movies = @(
  @{ slug = "interstellar"; wiki = "Interstellar_(film)" },
  @{ slug = "inception"; wiki = "Inception_(film)" },
  @{ slug = "dark-knight"; wiki = "The_Dark_Knight" },
  @{ slug = "dune"; wiki = "Dune_(2021_film)" },
  @{ slug = "blade-runner"; wiki = "Blade_Runner_2049" },
  @{ slug = "arrival"; wiki = "Arrival_(film)" },
  @{ slug = "mad-max"; wiki = "Mad_Max:_Fury_Road" },
  @{ slug = "matrix"; wiki = "The_Matrix" },
  @{ slug = "parasite"; wiki = "Parasite_(2019_film)" },
  @{ slug = "everything"; wiki = "Everything_Everywhere_All_at_Once" },
  @{ slug = "oppenheimer"; wiki = "Oppenheimer_(film)" },
  @{ slug = "shawshank"; wiki = "The_Shawshank_Redemption" },
  @{ slug = "pulp-fiction"; wiki = "Pulp_Fiction" },
  @{ slug = "spirited-away"; wiki = "Spirited_Away" },
  @{ slug = "la-la-land"; wiki = "La_La_Land_(film)" },
  @{ slug = "whiplash"; wiki = "Whiplash_(2014_film)" },
  @{ slug = "godfather"; wiki = "The_Godfather" },
  @{ slug = "joker"; wiki = "Joker_(2019_film)" }
)

$ua = "HoneyMovie/1.0 (Educational; local XAMPP)"

foreach ($m in $movies) {
  $out = Join-Path $base "$($m.slug).jpg"
  $bannerOut = Join-Path $bannerBase "$($m.slug).jpg"
  Write-Host "Fetching $($m.slug)..."
  Start-Sleep -Seconds 2
  try {
    $api = "https://en.wikipedia.org/api/rest_v1/page/summary/$([uri]::EscapeDataString($m.wiki))"
    $data = Invoke-RestMethod -Uri $api -TimeoutSec 30 -UserAgent $ua
    $url = $data.originalimage.source
    if (-not $url) { $url = $data.thumbnail.source }
    if (-not $url) { Write-Host "  No image in API"; continue }
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 60 -UserAgent $ua
    Copy-Item -Path $out -Destination $bannerOut -Force
    $kb = [math]::Round((Get-Item $out).Length / 1KB, 1)
    Write-Host "  OK ($kb KB)"
  } catch {
    Write-Host "  Failed: $($_.Exception.Message)"
  }
}

Write-Host "All downloads finished."
