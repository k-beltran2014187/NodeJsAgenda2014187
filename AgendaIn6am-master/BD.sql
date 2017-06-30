CREATE DATABASE AgendaIn6am;

Use AgendaIn6am; 

CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT,
    nombreCategoria VARCHAR(30) NOT NULL,
	PRIMARY KEY (idCategoria)
    );
    
CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(40) NOT NULL,
    idCategoria INT NOT NULL,
    PRIMARY KEY(idContacto),
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)

);

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
    nick VARCHAR(30) NOT NULL,
    contrasena VARCHAR(30) NOT NULL,
    PRIMARY KEY (idUsuario)
);



CREATE TABLE UsuarioDetalle(
	idUsuarioDetalle INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idContacto INT NOT NULL,
    PRIMARY KEY (idUsuarioDetalle),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idContacto) REFERENCES Contacto(idContacto)
);


CREATE VIEW ViewContacto AS
SELECT contacto.idContacto, nombre, apellido, direccion, telefono, correo, nombreCategoria
FROM Contacto
INNER JOIN categoria on contacto.idCategoria = categoria.idCategoria;

/*
SELECT * FROM ViewContacto;*/


 DELIMITER //
 CREATE PROCEDURE borrarContacto(IN c_idContacto INT)
	BEGIN 
		
    DELETE FROM Contacto
    WHERE  idContacto = c_idContacto;
END 