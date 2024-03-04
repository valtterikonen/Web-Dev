const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../backend/app");
const User = require("../backend/models/userModel");
const Goal = require("../backend/models/goalModel");

const api = supertest(app);

let token = null;

beforeAll(async () => {
    await User.deleteMany({});
});

describe("User registration and login", () => {
    test("User can register", async () => {
        const newUser = {
            email: "mattiv@matti.fi",
            password: "R3g5T7#gh",
        };
        await api
            .post("/api/user/signup")
            .send(newUser)
            .expect(201);
    });

    test("User can login", async () => {
        const loginUser = {
            email: "mattiv@matti.fi",
            password: "R3g5T7#gh",
        };
        const result = await api
            .post("/api/user/login")
            .send(loginUser)
            .expect(200);
        token = result.body.token;
    });
});

describe("CRUD operations for goals", () => {
    beforeEach(async () => {
        await Goal.deleteMany({});
    });

    test("Add new goal", async () => {
        const newGoal = {
            title: "testgoal",
            description: "This is a test goal",
        };
        await api
            .post("/api/goals")
            .set("Authorization", "bearer " + token)
            .send(newGoal)
            .expect(201);
    });

    test("Read goals", async () => {
        await api
            .get("/api/goals")
            .set("Authorization", "bearer " + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("Update goal", async () => {
        const updatedGoal = {
            title: "updatedgoal",
            description: "This is an updated test goal",
        };
        const goal = await api
            .get("/api/goals")
            .set("Authorization", "bearer " + token);
        await api
            .put(`/api/goals/${goal.body[0]._id}`)
            .set("Authorization", "bearer " + token)
            .send(updatedGoal)
            .expect(200);
    });

    test("Delete goal", async () => {
        const goal = await api
            .get("/api/goals")
            .set("Authorization", "bearer " + token);
        await api
            .delete(`/api/goals/${goal.body[0]._id}`)
            .set("Authorization", "bearer " + token)
            .expect(204);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
