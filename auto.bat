@echo off
chcp 65001 >nul
title AI Style Analyzer - Local Dev Launcher

echo ==========================================
echo   AI Style Analyzer 本地启动器
echo ==========================================
echo.

REM 切换到当前 bat 文件所在目录，也就是项目根目录
cd /d "%~dp0"

REM 检查 Node.js 是否安装
where node >nul 2>nul
if errorlevel 1 (
    echo [错误] 没有检测到 Node.js。
    echo 请先安装 Node.js: https://nodejs.org/
    echo.
    pause
    exit /b
)

REM 检查 npm 是否可用
where npm >nul 2>nul
if errorlevel 1 (
    echo [错误] 没有检测到 npm。
    echo 请确认 Node.js 已正确安装。
    echo.
    pause
    exit /b
)

REM 如果没有 node_modules，则自动安装依赖
if not exist "node_modules" (
    echo [提示] 第一次运行，正在安装依赖 npm install ...
    echo.
    npm install
    if errorlevel 1 (
        echo.
        echo [错误] npm install 失败，请检查网络或 package.json。
        pause
        exit /b
    )
)

echo.
echo [启动中] 正在启动本地开发服务器...
echo.

REM 单独打开一个窗口运行 npm run dev
start "AI Style Analyzer Dev Server" cmd /k "cd /d ""%~dp0"" && npm run dev"

REM 等待几秒后自动打开浏览器
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo ==========================================
echo   已尝试打开浏览器:
echo   http://localhost:5173
echo.
echo   如果没有打开，请手动复制上面的地址。
echo   关闭新打开的 Dev Server 窗口即可停止服务。
echo ==========================================
echo.

pause
