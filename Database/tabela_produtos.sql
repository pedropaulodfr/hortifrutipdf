create table frutas (
	id serial primary key,
	nome varchar(200),
	valor decimal,
	quantidade_disponivel integer,
	unidade varchar(50),
	link_imagem varchar(255)
);


create table verduras (
	id serial primary key,
	nome varchar(200),
	valor decimal,
	quantidade_disponivel integer,
	unidade varchar(50),
	link_imagem varchar(255)
);

create table legumes (
	id serial primary key,
	nome varchar(200),
	valor decimal,
	quantidade_disponivel integer,
	unidade varchar(50),
	link_imagem varchar(255)
);


SELECT * FROM verduras;

insert into verduras
(nome, valor, quantidade_disponivel, unidade, link_imagem)
values 
('Alface Crespa', 3.99, 100, 'Maço', 'https://firebasestorage.googleapis.com/v0/b/hortifruti-75cfd.appspot.com/o/verduras%2Falface-crespa.png?alt=media');