const { request, expect } = require("./config");

describe("POST /favorites", function () {
  // Test for authentication requirement
  it("requires authentication", async function () {
    const response = await request.post("/favorites").send({
      airport_id: "YBR",
      note: "Going to Canada",
    });

    expect(response.status).to.eql(401);
  });

  // Test for getting favorite airports
  it("allows a user to get their favorite airports", async function () {
    const postResponse = await request
      .get("/favorites")
      .set("Authorization", "Bearer token=ypMMqeoBcavP4Cw3U9yzjPw5 ");
    expect(postResponse.status).to.eql(200);
  });

  // Test for saving and deleting favorite airports
  it("allows a user to save and delete their favorite airports", async function () {
    // Create a favorite
    const postResponse = await request
      .post("/favorites")
      .set("Authorization", "Bearer token=ypMMqeoBcavP4Cw3U9yzjPw5")
      .send({
        airport_id: "YBR",
        note: "Going to Canada",
      });
    expect(postResponse.status).to.eql(201);
    expect(postResponse.body.data.attributes.airport.name).to.eql(
      "Brandon Municipal Airport"
    );
    expect(postResponse.body.data.attributes.note).to.eql("Going to Canada");

    const favoriteId = postResponse.body.data.id;

    // Update the note of the created favorite
    const putResponse = await request
      .put(`/favorites/${favoriteId}`)
      .set("Authorization", "Bearer token=ypMMqeoBcavP4Cw3U9yzjPw5")
      .send({
        note: "My usual layover when visiting family and friends",
      });

    expect(putResponse.status).to.eql(200);
    expect(putResponse.body.data.attributes.note).to.eql(
      "My usual layover when visiting family and friends"
    );

    // Delete the created favorite
    const deleteResponse = await request
      .delete(`/favorites/${favoriteId}`)
      .set("Authorization", "Bearer token=ypMMqeoBcavP4Cw3U9yzjPw5");

    expect(deleteResponse.status).to.eql(204);

    // Verify that the record was deleted
    const getResponse = await request
      .get(`/favorites/${favoriteId}`)
      .set("Authorization", "Bearer token=ypMMqeoBcavP4Cw3U9yzjPw5");

    expect(getResponse.status).to.eql(404);
  });
});
