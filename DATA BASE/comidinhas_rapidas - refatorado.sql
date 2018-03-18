CREATE SCHEMA IF NOT EXISTS `comidinhas_rapidas` DEFAULT CHARACTER SET utf8 ;
USE `comidinhas_rapidas` ;

-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`garcon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`garcon` (
  `id_garcon` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `gorjeta` FLOAT NOT NULL,
  PRIMARY KEY (`id_garcon`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`produto` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `valor` FLOAT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(200) NOT NULL,
  `tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`mesa` (
  `id_mesa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_mesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`pedido` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `garcon_id_garcon` INT NOT NULL,
  `mesa_id_mesa` INT NOT NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedido_garcon_idx` (`garcon_id_garcon` ASC),
  INDEX `fk_pedido_mesa1_idx` (`mesa_id_mesa` ASC),
  CONSTRAINT `fk_pedido_garcon`
    FOREIGN KEY (`garcon_id_garcon`)
    REFERENCES `comidinhas_rapidas`.`garcon` (`id_garcon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_mesa1`
    FOREIGN KEY (`mesa_id_mesa`)
    REFERENCES `comidinhas_rapidas`.`mesa` (`id_mesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`pagamento` (
  `id_pagamento` INT NOT NULL AUTO_INCREMENT,
  `valor_total` FLOAT NOT NULL,
  `valor_dividido` FLOAT NOT NULL,
  `forma_pagamento` VARCHAR(45) NOT NULL,
  `pedido_id_pedido` INT NOT NULL,
  PRIMARY KEY (`id_pagamento`, `pedido_id_pedido`),
  INDEX `fk_pagamento_pedido1_idx` (`pedido_id_pedido` ASC),
  CONSTRAINT `fk_pagamento_pedido1`
    FOREIGN KEY (`pedido_id_pedido`)
    REFERENCES `comidinhas_rapidas`.`pedido` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`item` (
  `id_item` INT NOT NULL AUTO_INCREMENT,
  `quantidade` VARCHAR(45) NOT NULL,
  `produto_id_produto` INT NOT NULL,
  PRIMARY KEY (`id_item`),
  INDEX `fk_item_produto1_idx` (`produto_id_produto` ASC),
  CONSTRAINT `fk_item_produto1`
    FOREIGN KEY (`produto_id_produto`)
    REFERENCES `comidinhas_rapidas`.`produto` (`id_produto`)
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
    FOREIGN KEY (`pagamento_id_pagamento` , `pagamento_pedido_id_pedido`)
    REFERENCES `comidinhas_rapidas`.`pagamento` (`id_pagamento` , `pedido_id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comidinhas_rapidas`.`pedido_has_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comidinhas_rapidas`.`pedido_has_item` (
  `pedido_id_pedido` INT NOT NULL,
  `item_id_item` INT NOT NULL,
  PRIMARY KEY (`pedido_id_pedido`, `item_id_item`),
  INDEX `fk_pedido_has_item_item1_idx` (`item_id_item` ASC),
  INDEX `fk_pedido_has_item_pedido1_idx` (`pedido_id_pedido` ASC),
  CONSTRAINT `fk_pedido_has_item_pedido1`
    FOREIGN KEY (`pedido_id_pedido`)
    REFERENCES `comidinhas_rapidas`.`pedido` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_has_item_item1`
    FOREIGN KEY (`item_id_item`)
    REFERENCES `comidinhas_rapidas`.`item` (`id_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;