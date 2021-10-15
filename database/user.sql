create table users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  gender boolean DEFAULT TRUE,
  birth_date DATE NOT NULL,
  mobile VARCHAR(15) DEFAULT NULL,
  email VARCHAR(50) DEFAULT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_date TIMESTAMP NOT NULL,
  update_date TIMESTAMP DEFAULT NULL
);

create table user_friend(
  id SERIAL PRIMARY KEY,
  source_id BIGINT NOT NULL,
  target_id BIGINT NOT NULL,
  status VARCHAR(15) NOT NULL,
  create_date: TIMESTAMP NOT NULL,
  update_date: TIMESTAMP DEFAULT NULL,
);

create table refresh_tokens(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255) NOT NULL
);