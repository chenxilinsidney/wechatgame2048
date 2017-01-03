/*DROP TABLE IF EXISTS user_info;*/
CREATE TABLE IF NOT EXISTS user_info(
    name_id TINYINT(2) NOT NULL AUTO_INCREMENT COMMENT '用户id',
    ts TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp COMMENT '最后一次操作时间戳',
    name VARCHAR(128) NOT NULL DEFAULT '' COMMENT '用户名称',
    photo VARCHAR(256) NOT NULL DEFAULT '' COMMENT '用户头像',
    gender TINYINT(2) NOT NULL DEFAULT 0 COMMENT '用户性别',
    country VARCHAR(256) NOT NULL DEFAULT '' COMMENT '用户国籍',
    province VARCHAR(256) NOT NULL DEFAULT '' COMMENT '用户所在省市',
    city VARCHAR(256) NOT NULL DEFAULT '' COMMENT '用户所在城市',
    language VARCHAR(256) NOT NULL DEFAULT '' COMMENT '用户使用语言',
    PRIMARY KEY(name_id),
    UNIQUE KEY idx_name(name)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=UTF8 COMMENT '用户信息';

/*DROP TABLE IF EXISTS game_info;*/
CREATE TABLE IF NOT EXISTS game_info(
    game_id TINYINT(2) NOT NULL AUTO_INCREMENT COMMENT '游戏信息id',
    name_id TINYINT(2) NOT NULL COMMENT '游戏用户id',
    ts TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp COMMENT '最后一次操作时间戳',
    game_mode TINYINT(2) NOT NULL DEFAULT 1 COMMENT '游戏模式',
    game_level TINYINT(2) NOT NULL DEFAULT 1 COMMENT '游戏级别',
    game_score TINYINT(2) NOT NULL DEFAULT 1 COMMENT '游戏分数',
    game_status VARCHAR(256) NOT NULL DEFAULT '' COMMENT '游戏状态',
    game_time VARCHAR(256) NOT NULL DEFAULT '' COMMENT '游戏时间',
    game_string VARCHAR(256) NOT NULL DEFAULT '' COMMENT '游戏最后一次数据记录',
    PRIMARY KEY(game_id),
    FOREIGN KEY fk_name_id(name_id) REFERENCES user_info(name_id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=UTF8 COMMENT '游戏信息';
