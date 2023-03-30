require('dotenv').config();
const express = require('express');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(express.json());

const request = require("supertest");

const volunteerRoute = require('../routes/volunteerRoute');

api.use(volunteerRoute);

describe("/volunteer", () => {
    it("GET /?volunteer_id", async () => {
        const resp = await request(api).get('/?volunteer_id=5');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toStrictEqual({
            volunteer_id: 5,
            post_id: 3,
            user_id: 3
        });
    });

    it("GET /?post_id", async () => {
        const resp = await request(api).get('/?post_id=1');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toStrictEqual([
            {
                post_id: 1,
                title: "How to Bake a Cake",
                content: "Baking a cake is easier than you think. Here are the steps...",
                category: "Baking",
                votes: 0,
                created_date: expect.any(String),
                user_id: 1,
                volunteer_id: 1
            },  
            {
                post_id: 1,
                title: "How to Bake a Cake",
                content: "Baking a cake is easier than you think. Here are the steps...",
                category: "Baking",
                votes: 0,
                created_date: expect.any(String),
                user_id: 2,
                volunteer_id: 2
            }, 
            {
                post_id: 1,
                title: "How to Bake a Cake",
                content: "Baking a cake is easier than you think. Here are the steps...",
                category: "Baking",
                votes: 0,
                created_date: expect.any(String),
                user_id: 3,
                volunteer_id: 3
            } 
        ]);
    });

    it("GET /?user_id", async () => {
        const resp = await request(api).get('/?user_id=3');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toStrictEqual([
            {
                post_id: 1,
                title: "How to Bake a Cake",
                content: "Baking a cake is easier than you think. Here are the steps...",
                category: "Baking",
                votes: 0,
                created_date: expect.any(String),
                user_id: 3,
                volunteer_id: 3
            },
            {
                post_id: 2,
                title: "The Best Hikes in the Mountains",
                content: "If you love hiking and are looking for new trails to explore, check out these top picks...",
                category: "Hiking",
                votes: 0,
                created_date: expect.any(String),
                user_id: 3,
                volunteer_id: 4
            },
            {
                post_id: 3,
                title: "Tips for Working from Home",
                content: "Working from home can be a challenge, but with these tips and tricks...",
                category: "Work",
                votes: expect.any(Number),
                created_date: expect.any(String),
                user_id: 3,
                volunteer_id: 5
            } 
        ]);
    });

    it("PATCH /:id", async () => {
        const resp = await request(api).patch('/9').send({
            post_id: 1,
            user_id: 4 
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toStrictEqual({
            volunteer_id: 9,
            post_id: 1,
            user_id: 4 
        });
    });

    it("DELETE /:id", async () => {
        const resp = await request(api).delete('/6');
        expect(resp.statusCode).toBe(204);
        expect(resp.body).toStrictEqual({});
    });
});
