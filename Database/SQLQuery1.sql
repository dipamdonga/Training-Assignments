CREATE DATABASE Demo

CREATE TABLE Student(
	StudentID int,
	StudentName varchar(20),
	Age int DEFAULT 20
);

ALTER TABLE Student
ADD email varchar(20)

INSERT INTO Student
VALUES
(1,'Stu1',21,'Stu1@aimdek.com'),
(2,'Stu2',18,'Stu2@aimdek.com'),
(3,'Stu3',17,'Stu3@aimdek.com'),
(4,'Stu4',DEFAULT,'Stu4@aimdek.com')

SELECT * FROM Student
WHERE Age like '1_'

SELECT COUNT(Age) FROM Student
Group by Age

SELECT distinct Age FROM Student

INSERT INTO Student(Age)
VALUES (30)

DELETE FROM Student
WHERE Age = 30

SELECT * FROM Student
WHERE Age = 20

