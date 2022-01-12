

/**************TCL Commands**********************/

SELECT * FROM student

BEGIN TRANSACTION
INSERT INTO Student(First_name)
VALUES('rajesh')

COMMIT TRANSACTION

ROLLBACK TRANSACTION


/*****************Function********************/
SELECT * FROM Fee

SELECT LOWER(First_name) FROM student
SELECT UPPER(First_name) FROM student
SELECT AVG(Amount_Paid) FROM Fee
SELECT MAX(Amount_Paid) FROM Fee
SELECT MIN(Amount_Paid) FROM Fee
SELECT SUM(Amount_Paid) FROM Fee
SELECT COUNT(Amount_Paid) FROM Fee