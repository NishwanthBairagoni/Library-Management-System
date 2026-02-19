@echo off
echo Starting tests... > test_execution.log
call mvn test -Dtest=StudentRegistrationTest >> test_execution.log 2>&1
echo Tests completed. >> test_execution.log
