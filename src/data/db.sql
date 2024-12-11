DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    perfil VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



INSERT INTO medicos (nombre, especialidad, perfil) 
VALUES 
  ('carlos', 'Odontologia', 'RESIDENTE'),
('pepe', 'Cirugia plastica', 'ESPECIALISTA'),
  ('jose', 'Pediatria', 'ESPECIALISTA');


CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fechaNacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



INSERT INTO pacientes (nombre, localidad, fechaNacimiento) 
VALUES 
 ('antonio', 'Sevilla', '2023-10-10'),
 ('maria', 'Jaen', '1998-02-29'),
 ('miguel', 'Almeria', '1896-06-16');