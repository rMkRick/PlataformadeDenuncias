-- ====================================================
-- ELIMINAR BASE DE DATOS SI YA EXISTE
-- ====================================================
DROP DATABASE IF EXISTS denuncias_urbanas;

-- ====================================================
-- CREAR BASE DE DATOS
-- ====================================================
CREATE DATABASE Denuncias_Urbanas 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE Denuncias_Urbanas;

-- ====================================================
-- TABLA CARGO
-- ====================================================
CREATE TABLE Cargo (
    IdCargo INT PRIMARY KEY AUTO_INCREMENT,
    NombreCargo VARCHAR(100) NOT NULL
);

-- ====================================================
-- TABLA CIUDADANO
-- ====================================================
CREATE TABLE Ciudadano (
    IdCiudadano INT PRIMARY KEY AUTO_INCREMENT,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    DNI CHAR(8) NOT NULL UNIQUE,
    Correo VARCHAR(150) NOT NULL,
    Telefono VARCHAR(15),
    Usuario VARCHAR(50) NOT NULL UNIQUE,
    Contrasenia VARCHAR(255) NOT NULL,
    FechaRegistro DATETIME DEFAULT NOW()
);

-- ====================================================
-- TABLA FUNCIONARIO
-- ====================================================
CREATE TABLE Funcionario (
    IdFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Correo VARCHAR(150) NOT NULL,
    Telefono VARCHAR(15),
    Usuario VARCHAR(50) NOT NULL UNIQUE,
    Contrasenia VARCHAR(255) NOT NULL,
    IdCargo INT NOT NULL,
    FechaRegistro DATETIME DEFAULT NOW(),
    FOREIGN KEY (IdCargo) REFERENCES Cargo(IdCargo)
);

-- ====================================================
-- TABLA TIPO DE DENUNCIA
-- ====================================================
CREATE TABLE TipoDenuncia (
    IdTipoDenuncia INT PRIMARY KEY AUTO_INCREMENT,
    NombreTipo VARCHAR(100) NOT NULL
);

-- ====================================================
-- TABLA DENUNCIA (con geolocalización)
-- ====================================================
CREATE TABLE Denuncia (
    IdDenuncia INT PRIMARY KEY AUTO_INCREMENT,
    IdCiudadano INT NOT NULL,
    IdTipoDenuncia INT NOT NULL,
    Descripcion TEXT NOT NULL,
    Direccion VARCHAR(255),
    Latitud DECIMAL(9,6) NULL,
    Longitud DECIMAL(9,6) NULL,
    Estado VARCHAR(50) DEFAULT 'Pendiente',
    FechaRegistro DATETIME DEFAULT NOW(),
    IdFuncionarioAsignado INT NULL,
    FOREIGN KEY (IdCiudadano) REFERENCES Ciudadano(IdCiudadano),
    FOREIGN KEY (IdTipoDenuncia) REFERENCES TipoDenuncia(IdTipoDenuncia),
    FOREIGN KEY (IdFuncionarioAsignado) REFERENCES Funcionario(IdFuncionario)
);

-- ====================================================
-- TABLA TIPO DE EVIDENCIA
-- ====================================================
CREATE TABLE TipoEvidencia (
    IdTipoEvidencia INT PRIMARY KEY AUTO_INCREMENT,
    NombreTipo VARCHAR(50) NOT NULL
);

-- ====================================================
-- TABLA EVIDENCIA
-- ====================================================
CREATE TABLE Evidencia (
    IdEvidencia INT PRIMARY KEY AUTO_INCREMENT,
    IdDenuncia INT NOT NULL,
    IdTipoEvidencia INT NOT NULL,
    UrlArchivo VARCHAR(255) NOT NULL,
    FechaRegistro DATETIME DEFAULT NOW(),
    FOREIGN KEY (IdDenuncia) REFERENCES Denuncia(IdDenuncia),
    FOREIGN KEY (IdTipoEvidencia) REFERENCES TipoEvidencia(IdTipoEvidencia)
);

-- ====================================================
-- TABLA ESTADOS DE DENUNCIA
-- ====================================================
CREATE TABLE EstadoDenuncia (
    IdEstado INT PRIMARY KEY AUTO_INCREMENT,
    NombreEstado VARCHAR(50) NOT NULL
);

-- ====================================================
-- TABLA SEGUIMIENTO DE DENUNCIA
-- ====================================================
CREATE TABLE SeguimientoDenuncia (
    IdSeguimiento INT PRIMARY KEY AUTO_INCREMENT,
    IdDenuncia INT NOT NULL,
    Fecha DATETIME DEFAULT NOW(),
    IdEstado INT NOT NULL,
    Observacion VARCHAR(255),
    IdFuncionario INT NULL,
    FOREIGN KEY (IdDenuncia) REFERENCES Denuncia(IdDenuncia),
    FOREIGN KEY (IdEstado) REFERENCES EstadoDenuncia(IdEstado),
    FOREIGN KEY (IdFuncionario) REFERENCES Funcionario(IdFuncionario)
);

-- ====================================================
-- DATOS INICIALES
-- ====================================================
INSERT INTO Cargo (NombreCargo) VALUES
('Alcalde'),
('Gerente de Servicios Públicos'),
('Jefe de Limpieza'),
('Jefe de Seguridad Ciudadana'),
('Funcionario General');

INSERT INTO TipoDenuncia (NombreTipo) VALUES
('Basura en la via publica'),
('Baches en calles'),
('Falta de alumbrado'),
('Ruidos molestos'),
('Construcciones ilegales'),
('Problemas urbanos'),
('Otros');

INSERT INTO TipoEvidencia (NombreTipo) VALUES
('Imagen'),
('Video'),
('Audio'),
('Documento');

INSERT INTO EstadoDenuncia (NombreEstado) VALUES
('Pendiente'),
('En Proceso'),
('Resuelto'),
('Rechazado');

-- ====================================================
-- USUARIO DE PRUEBA
-- ====================================================
INSERT INTO Ciudadano (Nombres, Apellidos, DNI, Correo, Telefono, Usuario, Contrasenia) VALUES
('dani', '', '54645215', 'dani@gmail.com', '927011625', 'dani', '$2b$10$S1ee8DYGYTdNu.TxtrrYheGL3GlGbuQMlrQFiK94g11AInO6oVXUW');

-- ====================================================
-- DENUNCIAS DE PRUEBA
-- ====================================================
INSERT INTO Denuncia (IdCiudadano, IdTipoDenuncia, Descripcion, Direccion, Latitud, Longitud, Estado) VALUES
(1, 1, 'Hay un poste de luz roto en la esquina de mi calle.', 'Calle Falsa 123', -13.522, -71.967, 'Pendiente'),
(1, 2, 'Mucha basura acumulada en el parque.', 'Parque de los Lamentos', -13.523, -71.968, 'En Proceso');
