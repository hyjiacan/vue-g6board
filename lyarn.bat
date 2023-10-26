@echo off
set NODE_OPTIONS=--openssl-legacy-provider

set params=

:param
set str=%1
if "%str%"=="" (
    goto exec
)
set params=%params% %str%
shift /0
goto param

:exec
call yarn %params%
