INSERT INTO department
    (department_name)
VALUES
    ("Devops");
INSERT INTO department
    (department_name)
VALUES
    ("Customer Support");
INSERT INTO department
    (department_name)
VALUES
    ("Sales");
INSERT INTO department
    (department_name)
VALUES
    ("Marketing");
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("CEO", 250000, 1);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("CTO", 300000, 1);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Dev, sr", 180000, 2);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Dev, jr", 180000, 2);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Customer manager", 75000, 3);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Customer support", 50000, 3);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales,sr", 50000, 4);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales,jr", 37000, 4);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Marketing specialist", 75000, 4);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("UX designer", 100000, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Chance", "Wright", 1, 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Page", "Hunt", 2, 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Tamara", "Sidorova", 1, 2);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Monica", "Geller", 3, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Phoebe", "Buffe", 4, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Rachel", "Green", 3, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Joe", "Tribbiani", 5, 2);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Ross", "Geller", 6, 7);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Chandler", "Bing", 6, 7);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Harry", "Potter", 7, 2);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Hermione", "Granger", 8, 10);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Ron", "Whisley", 8, 10);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Drako", "Malfoy", 9, 10);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Luna", "Lovegood", 9, 10);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Sirius", "Black", 9, 10);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Albus", "Dumbledore", 10, 10);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Severus", "Snape", 10, 10);