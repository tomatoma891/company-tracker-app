# Company-tracker-app

## A solution for managing a company's employees using node, inquirer, and MySQL

## The command-line application allows users to:

* Add departments, roles, employees
* View departments, roles, employees
* Update employee roles
* View employees by manager
* Delete departments, roles, employees

# Visuals:
![](/images/companytracker.gif)
# Usage
1. Use the CLI interface to select employee management options
2. Menu options lead to additional prompts
3. Options return to the home menu.
4. Select the next option as needed.
5. Use the Exit option to close the application.

# Steps to Setup:
* Clone the repo
* git clone 
* Install dependencie npm install
* Create the database using the Schema.sql and seeds.sql files.
* DROP DATABASE IF EXISTS employee_db;
* CREATE DATABASE employee_db;
* USE employee_db;

* CREATE TABLE departments(
id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30)
);

* CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(8,2),
department_id INT,
FOREIGN KEY(department_id) REFERENCES departments(id)
);

* CREATE TABLE employees(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
);

* Run Server
node server.js

# What I Learned
1. SQL queries for Create, Read, Update, and Delete (CRUD)
2. Using NPM mysql module to interact with a MySQL backend
3. Creating SQL schema and seed files
