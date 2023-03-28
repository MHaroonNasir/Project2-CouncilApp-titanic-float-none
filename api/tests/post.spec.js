require('dotenv').config();
const express = require('express');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(express.json());

const request = require("supertest");

const postRoutes = require('../routes/postRoutes');

api.use(postRoutes);

describe("/posts", () => {
    it("GET /", async () => {
        const resp = await request(api).get('/');
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body.length).toEqual(5);
    });

    //GET /top

    it("GET /:id", async () => {
        const resp = await request(api).get('/2');
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({
            post_id: 2,
            title: "The Best Hikes in the Mountains",
            content: "If you love hiking and are looking for new trails to explore, check out these top picks...",
            category: "Hiking",
            votes: 0,
            created_date: expect.any(String),
            user_id: 1
        });
    });

    it("POST /", async () => {
        const resp = await request(api).post('/').send({
            title: "post title",
            content: "new post",
            category: "Hiking",
            votes: 0,
            user_id: 1
        });
        expect(resp.statusCode).toBe(201);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual([{
            post_id: 6,
            title: "post title",
            content: "new post",
            category: "Hiking",
            votes: 0,
            created_date: expect.any(String),
            user_id: 1
        }]);
    });

    it("PATCH /:id", async () => {
        const resp = await request(api).patch('/3').send({
            votes: 25
        });
        expect(resp.statusCode).toBe(200);
        console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({
            post_id: 3,
            votes: 25
        });
    });

    it("DELETE /:id", async () => {
        const resp = await request(api).delete('/6');
        expect(resp.statusCode).toBe(204);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({});
    });
});
