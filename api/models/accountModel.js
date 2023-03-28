const db = require('../db/connect');

class Account {

    constructor({user_id, username, email, password}) {
        this.user_id = user_id;
        this.username = username
        this.email = email;
        this.password = password;

    };

    static async getAll() {
        const response = await db.query("SELECT * FROM account;");
        if (response.rows.length < 1) {
            throw new Error("No data in Account table.");
        };
        return response.rows.map(a => new Account(a));
    };

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM account WHERE user_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Cannot find that user ID in Account Table.");
        };
        return new Account(response.rows[0]);
    };

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        };
        return new Account(response.rows[0]);
    };
    

    static async create(data) {
        const { username, email, password } = data;
        let response = await db.query("INSERT INTO account (username, email, password) VALUES ($1, $2, $3) RETURNING *;", 
            [username, email, password]);
            const newId = response.rows[0].user_id;
            const newUser = await Account.getOneById(newId);
            return newUser;
    };

    async update(data) {
        const { username, email, password } = data;
        const response = await db.query("UPDATE account SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *;", 
            [username, email, password, this.user_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update votes.");
        };
        return new Account(response.rows[0]);
    };

    async destroy() {
        const response = await db.query("DELETE FROM account WHERE user_id = $1 RETURNING *;", 
            [this.user_id]);
        return new Account(response.rows[0]);
    };
};

module.exports = Account;
