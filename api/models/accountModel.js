const db = require('../db/connect');

class Account {
    constructor({user_id, first_name, last_name, email}) {
        this.user_id = user_id,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email
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

    static async create(data) {
        const { first_name, last_name, email, password } = data;
        const response = await db.query("INSERT INTO account (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;", 
            [first_name, last_name, email, password]);
        return response.rows.map(a => new Account(a));
    };

    async update(data) {
        const { user_id, first_name, last_name, email, password } = data;
        const response = await db.query("UPDATE account SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE user_id = $5 RETURNING *;", 
            [first_name, last_name, email, password, this.user_id]);
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
