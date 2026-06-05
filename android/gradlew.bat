@echo off
set DIR=%~dp0
set WRAPPER_JAR=%DIR%gradle\wrapper\gradle-wrapper.jar
if not exist "%WRAPPER_JAR%" (
    echo Downloading Gradle wrapper...
    mkdir "%DIR%gradle\wrapper" 2>nul
    curl -sL "https://github.com/gradle/gradle/raw/v8.5.0/gradle/wrapper/gradle-wrapper.jar" -o "%WRAPPER_JAR%"
)
java -Xmx1024m -jar "%WRAPPER_JAR%" %*
