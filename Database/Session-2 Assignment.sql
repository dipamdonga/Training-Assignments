USE Demo

CREATE TABLE Student1(
	StudentID int PRIMARY KEY,
	Firstname varchar(20),
	Lastname varchar(20),
	Age int DEFAULT 20,
	Emailid varchar(20)
)

CREATE TABLE Fee(
	FeeID int PRIMARY KEY,
	Course varchar(20),
	Amount_paid int,
	StudentID int FOREIGN KEY REFERENCES Student1(StudentID)
)

CREATE TABLE Book(
	BookID int PRIMARY KEY,
	Bookname varchar(20),
	StudentID int FOREIGN KEY REFERENCES Student1(StudentID)
)

INSERT INTO Student1
VALUES
(1,'Raj','Joshi',22,'Raj@aimdek.com'),
(2,'Raju','Doshi',21,'Raju@aimdek.com'),
(3,'Rajesh','Patel',16,'Rajesh@aimdek.com'),
(4,'Tirth','Shah',25,'Tirth@aimdek.com'),
(5,'Aum','Dave', 30,'Aum@aimdek.com'),
(6,'Jay','Patel',22,'Jay@aimdek.com')

INSERT INTO Fee
VALUES
(1,'ME',4000,1),
(2,'CE',NULL,2),
(3,'EE',2000,3),
(4,'ME',NULL,4),
(5,'EE',3600,5),
(6,'CE',7900,6)

INSERT INTO Book
VALUES
(1,'Geeta',1),
(2,'Champak',2),
(3,'Bybal',3),
(4,NULL,4),
(5,'Ramayana',5),
(6,'Geeta',6)


/*------------------------All Join------------------------*/ 
SELECT Student1.Firstname as First_Name, Student1.Lastname as Last_Name, Student1.Emailid as Email, Student1.Age, Fee.Course as Corse, Fee.Amount_paid as Paied_Amount, Book.Bookname
FROM Student1
INNER JOIN Fee
ON Student1.StudentID = Fee.StudentID
INNER JOIN Book
ON Student1.StudentID = Book.StudentID

SELECT Student1.Firstname as First_Name, Student1.Lastname as Last_Name, Student1.Emailid as Email, Student1.Age, Fee.Course as Corse, Fee.Amount_paid as Paied_Amount, Book.Bookname
FROM Student1
LEFT OUTER JOIN Fee
ON Student1.StudentID = Fee.StudentID
LEFT OUTER JOIN Book
ON Student1.StudentID = Book.StudentID

SELECT Student1.Firstname as First_Name, Student1.Lastname as Last_Name, Student1.Emailid as Email, Student1.Age, Fee.Course as Corse, Fee.Amount_paid as Paied_Amount, Book.Bookname
FROM Student1
RIGHT OUTER JOIN Fee
ON Student1.StudentID = Fee.StudentID
RIGHT OUTER JOIN Book
ON Student1.StudentID = Book.StudentID

SELECT Student1.Firstname as First_Name, Student1.Lastname as Last_Name, Student1.Emailid as Email, Student1.Age, Fee.Course as Corse, Fee.Amount_paid as Paied_Amount, Book.Bookname
FROM Student1
FULL OUTER JOIN Fee
ON Student1.StudentID = Fee.StudentID
FULL OUTER JOIN Book
ON Student1.StudentID = Book.StudentID


/*------------------------Store Procedure------------------------*/ 
CREATE PROCEDURE spGetStudent1
AS
SELECT * FROM Student1

EXEC spGetStudent1

CREATE PROCEDURE spGetStudent1AsPerAge
	@age  int 
AS
SELECT * FROM Student1
WHERE Student1.Age = @age

EXEC spGetStudent1AsPerAge 22
/*--------------------------------*/
CREATE PROCEDURE spGetStudentCountAsPerAge
	@age  int,
	@count int OUTPUT
AS
SELECT *
FROM Student1
WHERE Student1.Age = @age
SELECT @count = @@ROWCOUNT

DECLARE @count INT
EXEC spGetStudentCountAsPerAge 22, @count = @count OUTPUT;
SELECT @count AS 'Number of Students found';


/*------------------------View------------------------*/ 
CREATE VIEW vGetStudentName
AS
SELECT Student1.Firstname as First_Name, Student1.Lastname as Last_Name
FROM Student1

SELECT * FROM vGetStudentName

/*------------------------Error Handling in SP------------------------*/ 
BEGIN TRY  
  SELECT
    1 / 0 AS Error;
END TRY
BEGIN CATCH
  SELECT
    ERROR_MESSAGE() AS ErrorMessage;
END CATCH;