create table entregas (
	id int auto_increment primary key,
	data_pedido date not null default current_timestamp,
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
	valor_total float,
	produto_id integer,
	categoria varchar(100)
);

select * from entregas;

insert into entregas (nome, cpf, rua, numero, bairro, cidade, cep, telefone, produto, quantidade, valor_total, produto_id, categoria)
values
('Nome Teste', 'CPF Teste', 'Rua Teste', 1, 'Bairro Teste', 'Cidade Teste', 'CEP Teste', 'Tel Teste', 'Produto Teste', 1, 3.99, 1, 'frutas');