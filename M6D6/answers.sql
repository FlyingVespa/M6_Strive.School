-- CREATE TABLE students (
-- id serial PRIAMARY KEY,
-- firstname VARCHAR (20) NOT NULL,
-- lastname VARCHAR (20) NOT NULL,
-- country VARCHAR (20) NOT NULL,
-- age INTEGER NOT NULL);

--  ....)
--   INSERT INTO
--   students (
--   firstname, lastname, country, age
--   )
--   VALUES (
--   'Lea', 'Hagovska', 'Thailand', 42);
--  INSERT INTO
--   students (
--   firstname, lastname, country, age
--   )
--   VALUES (
--   'Luna', 'Selene', 'Brasil', 25);
--  INSERT INTO
--   students (
--   firstname, lastname, country, age
--   )
--   VALUES (
--  'Magdalena', 'Sochon', 'Germany', 29);
--  INSERT INTO
--   students (
--   firstname, lastname, country, age
--   )
--   VALUES (
--   'Max', 'Lawrie', 'Liberia', 63);
--  INSERT INTO
--   students (
--   firstname, lastname, country, age
--   )
--   VALUES (
--   'Mohammed', 'Shah', 'Panama', 16);

--  UPDATE STUDENTS
--  SET COUNTRY = 'Thailand'
-- WHERE COUNTRY = 'Zimbabwe';

-- SELECT country = 'Germany' FROM students;
-- SELECT (country = 'Brasil')  OR (country= 'Thailand') FROM students;
-- SELECT firstname = 'Tom' FROM students;
-- SELECT age >= 23 FROM students;
-- SELECT (age >= 23) AND (age<=30) FROM students;
-- SELECT age IS NOT NULL from students ORDER BY age ASC;
-- SELECT age, COUNT(age >= 25)
-- FROM students
-- GROUP BY age;
-- DELETE FROM students WHERE (age <=18);


