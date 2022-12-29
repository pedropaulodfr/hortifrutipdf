create table usuarios (
	id int auto_increment primary key,
    nome varchar(200),
    cpf varchar(50),
    nome_usuario varchar(100),
    senha varchar(100),
    superuser boolean,
    imagem_perfil varchar(200)
);


insert into usuarios (nome, cpf, nome_usuario, senha, superuser, imagem_perfil) values
('Pedro Paulo Dantas Franco Rocha', '702.004.434-45', 'pedropaulodfr', '123mudar', true, 'https://firebasestorage.googleapis.com/v0/b/hortifruti-75cfd.appspot.com/o/profile%2F40974default.jpg?alt=media&token=50f996c9-c0a4-4272-afe8-337c0db29b68'),
('Leandra Lauana Izídio Ferreira', '707.184.084-97', 'leandralauana19', '123mudar', false, 'https://firebasestorage.googleapis.com/v0/b/hortifruti-75cfd.appspot.com/o/profile%2F6669487593IMG_20190915_110016_720.png?alt=media&token=9bf81a7a-a9ae-41af-8ff7-bf7c9ee3f1d6');

select * from usuarios;