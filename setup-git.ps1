Write-Host "Setting up Git repository and pushing to GitHub..." -ForegroundColor Green

Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host "Committing files..." -ForegroundColor Yellow
git commit -m "first commit"

Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

Write-Host "Adding remote origin..." -ForegroundColor Yellow
git remote add origin https://github.com/jonalexanderhere/jonsStore.git

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "Done! Repository has been pushed to GitHub." -ForegroundColor Green
Write-Host "You can now view your repository at: https://github.com/jonalexanderhere/jonsStore" -ForegroundColor Cyan



