# Install Skills Workflow

Use this workflow to install skills from this repository into the local Codex user skill directory.

```powershell
Get-ChildItem .\skills -Directory | ForEach-Object {
  Copy-Item -Recurse $_.FullName (Join-Path $env:USERPROFILE ".codex\skills\$($_.Name)") -Force
}
```

Install a single skill:

```powershell
Copy-Item -Recurse .\skills\<skill-name> $env:USERPROFILE\.codex\skills\<skill-name> -Force
```
