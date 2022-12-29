create table entregas (
	id serial primary key,
	data_pedido date not null default CURRENT_DATE,
	nome varchar(200),
	cpf varchar(100),
	rua varchar(200),
	numero integer,
	bairro varchar(100),
	cidade varchar(100),
	cep varchar(100),
	telefone varchar(100),
	produto varchar(200),
	quantidade integer,
	valor_total decimal,
	produto_id integer,
	categoria varchar(100)
);

select * from entregas;
