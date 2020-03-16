DROP DATABASE IF EXISTS team_profileDB;
CREATE database team_profileDB;

USE team_profileDB;

CREATE TABLE department
(
      id INT
      AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR
      (30)
);

      CREATE TABLE role
      (
            id INT
            AUTO_INCREMENT PRIMARY KEY,
title VARCHAR
            (30),
salary DECIMAL
            (8,2),
department_id INT,
FOREIGN KEY
            (department_id) REFERENCES departments
            (id)
);

            CREATE TABLE employee
            (
                  id INT
                  AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR
                  (30) NOT NULL,
last_name VARCHAR
                  (30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY
                  (role_id) REFERENCES roles
                  (id),
FOREIGN KEY
                  (manager_id) REFERENCES employees
                  (id)
);