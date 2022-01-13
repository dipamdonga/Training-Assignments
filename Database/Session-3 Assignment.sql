

/*---------------------TCL Commands---------------------*/

SELECT * FROM Student

BEGIN TRANSACTION
UPDATE Student
SET Student.First_name = 'User'
WHERE Student.Age BETWEEN 20 AND 22;


COMMIT TRANSACTION

ROLLBACK TRANSACTION


/*---------------------Function---------------------*/
SELECT * FROM Fee

SELECT AVG(Amount_Paid) FROM Fee
SELECT SUM(Amount_Paid) FROM Fee
SELECT COUNT(Amount_Paid) FROM Fee
SELECT LOWER(First_name) FROM student
SELECT UPPER(First_name) FROM student
SELECT MAX(Amount_Paid) FROM Fee
SELECT MIN(Amount_Paid) FROM Fee

/*---------------------User---------------------*/

CREATE LOGIN dipam WITH PASSWORD = 'dipam'

CREATE USER dipam FROM LOGIN dipam

EXECUTE AS USER = 'dipam'

SELECT * FROM fn_my_permissions ('TrainingDB','Database')

GRANT SELECT ON TrainingDB TO dipam

REVOKE SELECT ON TrainingDB TO dipam

GRANT CONTROL ON DATABASE :: TrainingDB TO dipam

