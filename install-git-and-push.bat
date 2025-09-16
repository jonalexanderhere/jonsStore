@echo off
echo Installing Git and pushing to GitHub...

echo.
echo Step 1: Installing Git via Chocolatey...
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

echo.
echo Step 2: Installing Git...
choco install git -y

echo.
echo Step 3: Refreshing environment variables...
call refreshenv

echo.
echo Step 4: Initializing Git repository...
git init

echo.
echo Step 5: Adding all files...
git add .

echo.
echo Step 6: Committing files...
git commit -m "first commit - JonsStore E-Commerce"

echo.
echo Step 7: Setting main branch...
git branch -M main

echo.
echo Step 8: Adding remote origin...
git remote add origin https://github.com/jonalexanderhere/jonsStore.git

echo.
echo Step 9: Pushing to GitHub...
git push -u origin main

echo.
echo Done! Repository has been pushed to GitHub successfully!
echo You can view it at: https://github.com/jonalexanderhere/jonsStore
pause
