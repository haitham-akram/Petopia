import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe("Test User follower controller", () => {
  test("200 | when followers are retrieved", async () => {
    await request(app)
      .get("/api/v1/follow/followers/1")
      .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  });
});

describe("Test addFollow controller", () => {
    test("201 | when user enters valid req", async () => {
      const newFollow = {
        followerId: 1,
        followingId: 3,
      };
  
      const response = await request(app)
        .post("/api/v1/follow/")
        .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)

        .send({  followingId: 3 })
        .expect(201);
  
      expect(response.body.message).toBe("Follow Created Successfully");
      expect(response.body.data).toMatchObject(newFollow);
    });
  });
  
  describe("Test unFollow controller", () => {
    test("200 | when follow is not found", async () => {
      const response = await request(app)
        .delete("/api/v1/follow/")
        .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)
        .send({  followingId:3 , followerId: 1})
        .expect(200);
  
      expect(response.body.message).toEqual("User Unfollowed Successfully");
    });

    test("401 | when follower is not found", async () => {
        const response = await request(app)
          .delete("/api/v1/follow/")
          .send({ })
          .expect(401);
    
        expect(response.body.message).toEqual("unauthorized");
      });

      test("401 | when follower is not found", async () => {
        const response = await request(app)
          .delete("/api/v1/follow/")
          .set("Cookie", `token=${process.env.TOKEN_REGULAR}`)

          .send({ })
          .expect(400);
    
        expect(response.body.data.errors[0]).toEqual("followingId is a required field");
      });
  });

  
  