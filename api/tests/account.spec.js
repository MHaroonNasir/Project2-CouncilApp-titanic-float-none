require('dotenv').config();
const express = require('express');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(express.json());

const request = require("supertest");

const accountRoute = require('../routes/accountRoute');
const { hash } = require('bcrypt');

api.use(accountRoute);

describe("/account", () => {
    it("GET /", async () => {
        const resp = await request(api).get('/');
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body.length).toEqual(5);
    });

    it("GET /:id", async () => {
        const resp = await request(api).get('/2');
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({
            user_id: 2,
            username: "Jane",
            email: "jane.smith@example.com",
            password: "password"
        });
    });

    it("POST /", async () => {
        const resp = await request(api).post('/register').send({
            username: "Bob",
            email: "doo.bar@example.com",
            password: "password"
        });
        expect(resp.statusCode).toBe(201);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({
            user_id: 6,
            username: "Bob",
            email: "doo.bar@example.com",
            password: expect.any(String)
        });
    });

    it("PATCH /:id", async () => {
        const resp = await request(api).patch('/3').send({
            username: "patchtest",
            email: "test.test@example.com",
            password: "password"
        });
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({
            user_id: 3,
            username: "patchtest",
            email: "test.test@example.com",
            password: "password"
        });
    });

    it("DELETE /:id", async () => {
        const resp = await request(api).delete('/6');
        expect(resp.statusCode).toBe(204);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({});
    });
});
