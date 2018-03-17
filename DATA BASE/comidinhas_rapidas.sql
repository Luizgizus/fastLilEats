CREATE DATABASE `comidinhas_praticas`;
USE `comidinhas_praticas`;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Estrutura tabela `Garcon`
--

DROP TABLE IF EXISTS `Garcon`;
CREATE TABLE IF NOT EXISTS `Garcon` (
	`idGarcon` int(11) NOT NULL AUTO_INCREMENT,
	`gorjeta` float(11) NOT NULL,
	`nome` varchar(50) NOT NULL,
	`cpf` varchar(20) NOT NULL,
	`email` varchar(45) DEFAULT NULL,
	`telefone` varchar(20) DEFAULT NULL,
	PRIMARY KEY (`idGarcon`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Estrutura tabela `Cliente`
--


DROP TABLE IF EXISTS `Cliente`;
CREATE TABLE IF NOT EXISTS `Cliente` (
	`idCliente` int(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(45) DEFAULT NULL,
	`pontos` int(20) NOT NULL,
	PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


--
-- Estrutura tabela `Pedido`
--

DROP TABLE IF EXISTS `Pedido`;
CREATE TABLE IF NOT EXISTS `Pedido`(
	`idPedido` int(11) NOT NULL AUTO_INCREMENT,
	`idMesa` int (11) NOT NULL,
	`idItem` int (11) DEFAULT NULL,
	`idGarcon` int (11) DEFAULT NULL,
	`status` varchar (20) NOT NULL,
	PRIMARY KEY (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


--
-- Estrutura tabela `Item`
--

DROP TABLE IF EXISTS `Item`;
CREATE TABLE IF NOT EXISTS `Item` (
	`idItem` int(11) NOT NULL AUTO_INCREMENT,
	`quantidade` int(11) NOT NULL,
	`idProduto` int(11) NOT NULL,
	PRIMARY KEY (`idItem`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


--
-- Estrutura tabela `Item`
--

DROP TABLE IF EXISTS `Produto`;
CREATE TABLE IF NOT EXISTS `Produto` (
	`idProduto` int(11) NOT NULL AUTO_INCREMENT,
	`valor` float(40) NOT NULL,
	`nome` varchar(50) NOT NULL,
	`descricao` varchar(200) DEFAULT NULL,
	`tipoProduto` varchar(20) NOT NULL,
	PRIMARY KEY (`idProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


--
-- Estrutura tabela `Mesa`
--

DROP TABLE IF EXISTS `Mesa`;
CREATE TABLE IF NOT EXISTS `Mesa` (
	`idMesa` int(11) NOT NULL AUTO_INCREMENT,
	`nomeMesa` varchar (20) NOT NULL,
	`quantidadePessoas` int(11) DEFAULT NULL,
	`status` varchar(20) NOT NULL,
	`idPedido` int (11) DEFAULT NULL,
	PRIMARY KEY (`idMesa`),
	KEY `idPedido` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


--
-- Estrutura tabela `Pagamento`
--

DROP TABLE IF EXISTS `Pagamento`;
CREATE TABLE IF NOT EXISTS `Pagamento` (
	`idPagamento` int(11) NOT NULL AUTO_INCREMENT,
	`valorTotal` float(20) NOT NULL,
	`dataPagamento` date NOT NULL,
	`formaPagamento` varchar(20) NOT NULL,
	`idCliente` int(11) DEFAULT NULL,
	PRIMARY KEY (`idPagamento`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


--
-- Limitadores para a tabela `Mesa`
--

ALTER TABLE `Mesa`
	ADD CONSTRAINT `idPedido` FOREIGN KEY (`idPedido`) REFERENCES `Pedido` (`idPedido`) ON DELETE CASCADE;
COMMIT;	
