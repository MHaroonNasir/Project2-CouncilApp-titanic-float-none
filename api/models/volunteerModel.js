const db = require('../db/connect');

class Volunteer {
    constructor({volunteer_id, post_id, user_id}) {
        this.volunteer_id = volunteer_id;
        this.post_id = post_id;
        this.user_id = user_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM volunteer;");
        if (response.rows.length < 1) {
            throw new Error("No data in Volunteer table.");
        };
        return response.rows.map(v => new Volunteer(v));
    };

    static async getOneById(id, fieldName) {
        let response;
        if (fieldName == "volunteer_id") {
            response = await db.query("SELECT * FROM volunteer WHERE volunteer_id = $1;", [id]);
        } else if (fieldName == "post_id") {
            response = await db.query("SELECT * FROM volunteer WHERE post_id = $1;", [id]);
        } else if (fieldName == "user_id") {
            response = await db.query("SELECT * FROM volunteer WHERE user_id = $1;", [id]);
        } else {
            throw new Error("Incorrect query string!");
        };
        if (response.rows.length < 1) {
            throw new Error("Cannot find Volunteer ID in Volunteer Table.");
        };
        if (response.rows.length != 1) {
            return response.rows.map(v => new Volunteer(v));
        }
        return new Volunteer(response.rows[0]);
    };

    static async create(data) {
        const { post_id, user_id } = data;
        let response = await db.query("INSERT INTO volunteer (post_id, user_id) VALUES ($1, $2) RETURNING *;", 
            [post_id, user_id]);
        return response.rows.map(v => new Volunteer(v));
    };

    async update(data) {
        const { post_id, user_id } = data;
        const response = await db.query("UPDATE volunteer SET post_id = $1, user_id = $2 WHERE volunteer_id = $3 RETURNING *;", 
            [post_id, user_id, this.volunteer_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to Volunteer table row.");
        };
        return new Volunteer(response.rows[0]);
    };

    async destroy() {
        const response = await db.query("DELETE FROM volunteer WHERE volunteer_id = $1 RETURNING *;", 
            [this.volunteer_id]);
        return new Volunteer(response.rows[0]);
    };
};

module.exports = Volunteer;