create table frutas (
	id int auto_increment primary key,
	nome varchar(200),
	valor float,
	quantidade_disponivel integer,
	unidade varchar(50),
	link_imagem varchar(255)
);

create table verduras (
	id int auto_increment primary key,
	nome varchar(200),
	valor float,
	quantidade_disponivel integer,
	unidade varchar(50),
	link_imagem varchar(255)
);

create table legumes (
	id int auto_increment primary key,
	nome varchar(200),
	valor float,
	quantidade_disponivel integer,
	unidade varchar(50),
	link_imagem varchar(255)
);

select * from legumes;

insert into legumes
(nome, valor, quantidade_disponivel, unidade, link_imagem)
values 
('Cenoura', 3.99, 100, 'UN', 'https://firebasestorage.googleapis.com/v0/b/hortifruti-75cfd.appspot.com/o/verduras%2Falface-crespa.png?alt=media');
