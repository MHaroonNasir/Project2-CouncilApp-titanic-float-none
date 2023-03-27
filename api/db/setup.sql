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





INSERT INTO account (first_name, last_name, email, password)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 'password'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'password'),
    ('Bob', 'Johnson', 'bob.johnson@example.com', 'password'),
    ('Sarah', 'Davis', 'sarah.davis@example.com', 'password'),
    ('Mike', 'Brown', 'mike.brown@example.com', 'password');

    INSERT INTO post (title, content, category, user_id)
VALUES
    ('How to Bake a Cake', 'Baking a cake is easier than you think. Here are the steps...', 'Baking', 1),
    ('The Best Hikes in the Mountains', 'If you love hiking and are looking for new trails to explore, check out these top picks...', 'Hiking', 1),
    ('Tips for Working from Home', 'Working from home can be a challenge, but with these tips and tricks...', 'Work', 3),
    ('The Benefits of Yoga', 'Yoga has been shown to have a number of health benefits, including...', 'Health', 4),
    ('The Top 10 Books of the Year', 'If you are a book lover, don''t miss out on these top picks...', 'Books', 5);
