const { use } = require("../api");
const db = require("../db/connect");

class Post {
    constructor ({ post_id, title, content, category, votes, created_date, user_id})
{
    this.post_id = post_id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.votes = votes;
    this.created_date = created_date;
    this.user_id = user_id;
}

    static async getAll() {
        const response = await db.query("SELECT * FROM post");
        if (response.rows.length === 0) {
            throw new Error("No posts available")
        }
        return response.rows.map(p => new Post(p));
    }

    static async getTopPost() {
        const response = await db.query("SELECT * FROM post ORDER BY votes DESC LIMIT 1;");
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM post WHERE post_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }
    static async create(data) {
        const { title, content, category, user_id } = data;   
        const response = await db.query('INSERT INTO post (title, content, category, user_id) VALUES ($1, $2, $3, $4) RETURNING *;',
        [title, content, category, user_id]);

        return response.rows.map(w => new Post(w))
    }

    async update(data) {
        const response = await db.query("UPDATE post SET votes = $1 WHERE post_id = $2 RETURNING post_id, votes;",
            [ this.votes + data.votes, this.post_id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update votes.")
        }
        return new Post(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.post_id]);
        return new Post(response.rows[0]);
    }
}

module.exports = Post;