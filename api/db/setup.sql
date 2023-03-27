DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title varchar(50) NOT NULL,
    content varchar(250) NOT NULL,
    category varchar(30) NOT NULL,
    votes INT DEFAULT 0,
    created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES account("user_id"), 
    PRIMARY KEY (post_id)
);

CREATE TABLE volunteer (
    volunteer_id INT GENERATED ALWAYS AS IDENTITY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES account("user_id"),
    FOREIGN KEY (post_id) REFERENCES post("post_id"),
    PRIMARY KEY (volunteer_id)
);