DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    email TEXT NOT NULL,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(500) NOT NULL,
    category VARCHAR(30) NOT NULL,
    votes INT DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
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

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES account("user_id")
);


INSERT INTO account (username, email, password)
VALUES
    ('John', 'john.doe@example.com', 'password'),
    ('Jane', 'jane.smith@example.com', 'password'),
    ('Bob', 'bob.johnson@example.com', 'password'),
    ('Sarah', 'sarah.davis@example.com', 'password'),
    ('Mike', 'mike.brown@example.com', 'password');

    INSERT INTO post (title, content, category, user_id)
VALUES
    ('How to Bake a Cake', 'Baking a cake is easier than you think. Here are the steps...', 'Baking', 1),
    ('The Best Hikes in the Mountains', 'If you love hiking and are looking for new trails to explore, check out these top picks...', 'Hiking', 1),
    ('Tips for Working from Home', 'Working from home can be a challenge, but with these tips and tricks...', 'Work', 3),
    ('The Benefits of Yoga', 'Yoga has been shown to have a number of health benefits, including...', 'Health', 4),
    ('The Top 10 Books of the Year', 'If you are a book lover, don''t miss out on these top picks...', 'Books', 5);
