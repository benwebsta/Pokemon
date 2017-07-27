@echo off
set i=1
for %%f in ("2*.png") do call :renameit "%%f"
goto done

:renameit
ren 2(%i%).png %i%.png

set /A i+=1
:done