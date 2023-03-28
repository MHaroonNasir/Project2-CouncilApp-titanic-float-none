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
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({
            volunteer_id: 5,
            post_id: 3,
            user_id: 3
        });
    });

    it("GET /?post_id", async () => {
        const resp = await request(api).get('/?post_id=1');
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual([
            {
                volunteer_id: 1,
                post_id: 1,
                user_id: 1
            },  
            {
                volunteer_id: 2,
                post_id: 1,
                user_id: 2
            }, 
            {
                volunteer_id: 3,
                post_id: 1,
                user_id: 3
            } 
        ]);
    });

    it("GET /?user_id", async () => {
        const resp = await request(api).get('/?user_id=3');
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual([
            {
                volunteer_id: 3,
                post_id: 1,
                user_id: 3
            },  
            {
                volunteer_id: 4,
                post_id: 2,
                user_id: 3
            }, 
            {
                volunteer_id: 5,
                post_id: 3,
                user_id: 3
            } 
        ]);
    });

    it("POST /", async () => {
        const resp = await request(api).post('/').send({
            post_id: 5,
            user_id: 5 
        });
        expect(resp.statusCode).toBe(201);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual([{
            volunteer_id: 11,
            post_id: 5,
            user_id: 5 
        }]);
    });

    it("PATCH /:id", async () => {
        const resp = await request(api).patch('/9').send({
            post_id: 1,
            user_id: 4 
        });
        expect(resp.statusCode).toBe(200);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({
            volunteer_id: 9,
            post_id: 1,
            user_id: 4 
        });
    });

    it("DELETE /:id", async () => {
        const resp = await request(api).delete('/6');
        expect(resp.statusCode).toBe(204);
        //console.log("resp",resp.body);
        expect(resp.body).toStrictEqual({});
    });
});
