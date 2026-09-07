$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

# These files/pages are no longer used after this patch.
$Paths = @(
  (Join-Path $Root 'app\products\[slug]\[productId]'),
  (Join-Path $Root 'components\theme\ThemeProvider.tsx'),
  (Join-Path $Root 'components\theme\ThemeToggle.tsx'),
  (Join-Path $Root 'lib\data\product-details.ts')
)

foreach ($Path in $Paths) {
  if (Test-Path -LiteralPath $Path) {
    Remove-Item -LiteralPath $Path -Recurse -Force
    Write-Host "Removed: $Path"
  }
}

$ThemeDir = Join-Path $Root 'components\theme'
if ((Test-Path -LiteralPath $ThemeDir) -and -not (Get-ChildItem -LiteralPath $ThemeDir -Force)) {
  Remove-Item -LiteralPath $ThemeDir -Force
}

Write-Host "Cleanup complete. Product detail pages and dark-theme source files are physically removed."
