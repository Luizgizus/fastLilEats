CREATE SCHEMA IF NOT EXISTS `comidinhas_rapidas` DEFAULT CHARACTER SET utf8 ;
USE `comidinhas_rapidas` ;

-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`garcon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`garcon` (
  `id_garcon` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `gorjeta` FLOAT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_garcon`))
ENGINE = InnoDB;

INSERT INTO garcon (nome, gorjeta, status) VALUES ("Jose arara", 0, "ativo");
INSERT INTO garcon (nome, gorjeta, status) VALUES ("Marcia Fagunes", 0, "ativo");
INSERT INTO garcon (nome, gorjeta, status) VALUES ("Rafael Fernandes", 0, "ativo");
INSERT INTO garcon (nome, gorjeta, status) VALUES ("Nícolas Moura", 0, "ativo");

-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`produto` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `valor` FLOAT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(200) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `quantidade` INT NOT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB;

INSERT INTO produto (valor, nome, descricao, tipo, quantidade) VALUES 
(20.00, "strogonoff", "strogonoff de frango", "alimento", 100)
,(30.00, "porção de batata frita", "batata frita com queijo", "alimento", 100)
,(10.00, "mexido", "mexido à mineira", "alimento", 100)
,(15.00, "porção de arroz", "arroz branco", "alimento", 100)
,(20.00, "porção de arroz ao alho", "arroz branco com alho", "alimento", 100)
,(9.00, "suco de laranja", "suco natural", "alimento", 100)
,(3.00, "suco de laranja(tang)", "refresco de pozinho", "alimento", 100)
,(12.00, "cerveja", "79% de teor de alcool", "alimento", 100)
,(100.00, "whisky", "Fortona", "alimento", 100)
,(4.00, "agua", "agua natural", "alimento", 100);

-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`mesa` (
  `id_mesa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_mesa`))
ENGINE = InnoDB;

INSERT INTO mesa (nome, status) VALUES ("Mesa Principal", "livre");
INSERT INTO mesa (nome, status) VALUES ("Mesa Grande", "livre");
INSERT INTO mesa (nome, status) VALUES ("Mesa Média", "livre");
INSERT INTO mesa (nome, status) VALUES ("Mesa Central", "livre");

-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`pagamento` (
  `id_pagamento` INT NOT NULL AUTO_INCREMENT,
  `valor_total` FLOAT NOT NULL,
  `valor_dividido` FLOAT NOT NULL,
  `forma_pagamento` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_pagamento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`pedido` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `garcon_id_garcon` INT NOT NULL,
  `mesa_id_mesa` INT NOT NULL,
  `pagamento_id_pagamento` INT,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedido_garcon_idx` (`garcon_id_garcon` ASC),
  INDEX `fk_pedido_mesa1_idx` (`mesa_id_mesa` ASC),
  INDEX `fk_pedido_pagamento1_idx` (`pagamento_id_pagamento` ASC),
  CONSTRAINT `fk_pedido_garcon`
    FOREIGN KEY (`garcon_id_garcon`)
    REFERENCES `comidinhas_rapidas`.`garcon` (`id_garcon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_mesa1`
    FOREIGN KEY (`mesa_id_mesa`)
    REFERENCES `comidinhas_rapidas`.`mesa` (`id_mesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_pagamento1`
    FOREIGN KEY (`pagamento_id_pagamento`)
    REFERENCES `comidinhas_rapidas`.`pagamento` (`id_pagamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `pagamento_id_pagamento` INT NOT NULL,
  `pagamento_pedido_id_pedido` INT NOT NULL,
  PRIMARY KEY (`id_cliente`),
  INDEX `fk_cliente_pagamento1_idx` (`pagamento_id_pagamento` ASC, `pagamento_pedido_id_pedido` ASC),
  CONSTRAINT `fk_cliente_pagamento1`
    FOREIGN KEY (`pagamento_id_pagamento`)
    REFERENCES `comidinhas_rapidas`.`pagamento` (`id_pagamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`pedido_produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`pedido_produto` (
  `id_pedido_produto` int NOT NULL AUTO_INCREMENT,
  `pedido_id_pedido` INT NOT NULL,
  `produto_id_produto` INT NOT NULL,
  `quantidade` INT NOT NULL,
  PRIMARY KEY (`id_pedido_produto`),
  INDEX `fk_pedido_has_produto_produto1_idx` (`produto_id_produto` ASC),
  INDEX `fk_pedido_has_produto_pedido1_idx` (`pedido_id_pedido` ASC),
  CONSTRAINT `fk_pedido_has_produto_pedido1`
    FOREIGN KEY (`pedido_id_pedido`)
    REFERENCES `comidinhas_rapidas`.`pedido` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_has_produto_produto1`
    FOREIGN KEY (`produto_id_produto`)
    REFERENCES `comidinhas_rapidas`.`produto` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;