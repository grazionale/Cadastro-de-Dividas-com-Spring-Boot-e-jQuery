CREATE TABLE debitos (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	motivo VARCHAR(50) NOT NULL,
    id_usuario BIGINT(20) NOT NULL,
    data DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

