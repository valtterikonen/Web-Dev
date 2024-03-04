const { request, expect } = require("./config");

describe("Airport API", function () {
  describe("GET /airports", function () {
    describe("when retrieving airports", function () {
      it("should return a list of airports limited to 30 per page", async function () {
        const response = await request.get("/airports");

        expect(response.status).to.eql(200);
        expect(response.body.data.length).to.eql(30);
      });
    });
  });

  describe("POST /airports/distance", function () {
    describe("when calculating the distance between two airports", function () {
      it("should return a 200 status and the distance information", async function () {
        const response = await request
          .post("/airports/distance")
          .send({ from: "KIX", to: "SFO" });

        expect(response.status).to.eql(200);

        const attributes = response.body.data.attributes;
        expect(attributes).to.include.keys(
          "kilometers",
          "miles",
          "nautical_miles"
        );
        expect(attributes.kilometers).to.be.closeTo(8692, 1);
        expect(attributes.miles).to.be.closeTo(5397, 1);
        expect(attributes.nautical_miles).to.be.closeTo(4690, 1);
      });
    });
  });
});