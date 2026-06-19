@echo off
chcp 65001 > nul
echo ============================================================
echo    侯小雯 Wonderland · Git 部署脚本
echo ============================================================
echo.
cd /d "E:\agents\personal-website"

REM === 0. 检查是否已经有 .git 目录
if exist ".git" (
    echo [0/5] ✓ 已检测到 Git 仓库
) else (
    echo [0/5] 初始化 Git 仓库...
    git init
    git init > nul 2>&1
)
echo.

REM === 1. 添加所有文件
echo [1/5] 添加所有文件到暂存区...
git add -A
if %errorlevel% neq 0 (
    echo ❌ 失败！
    pause
    exit /b 1
)
echo.

REM === 2. 提交
echo [2/5] 提交...
for /f "delims=" %%i in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"') do set NOW=%%i
git commit -m "deploy: %NOW% · 更新相册和代码"
echo.

REM === 3. 检查 remote
for /f "delims=" %%r in ('git remote 2^>nul') do set REMOTE=%%r
if "%REMOTE%"=="" (
    echo [3/5] ⚠️  还没有配置远程仓库
    echo.
    echo 请输入你的 GitHub 用户名：
    set /p USERNAME=
    echo.
    echo git remote add origin https://github.com/!USERNAME!/personal-website.git
    git remote add origin https://github.com/!USERNAME!/personal-website.git
) else (
    echo [3/5] ✓ 远程仓库：%REMOTE%
)
echo.

REM === 4. 推送
echo [4/5] 推送到 GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ❌ 推送失败！常见原因：
    echo    - GitHub 仓库不存在或权限错误
    echo    - 网络问题
    echo    - 需要用 Git Credential 登录
    echo.
    echo 解决：打开 https://github.com 手动检查
    pause
    exit /b 1
)
echo.

REM === 5. 触发 Vercel 部署（通常 Vercel 会自动监听到新 commit 并部署）
echo [5/5] ✓ 推送成功！
echo.
echo ============================================================
echo  ✅ 部署完成！
echo     Vercel 会在 1-2 分钟内自动部署新代码
echo     部署完后访问：https://你的域名.vercel.app
echo ============================================================
echo.
pause
