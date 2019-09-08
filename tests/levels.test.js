describe("level tests", () => {
  it("levels should be what they should be", () => {
    const levels = require("../lib/levels");

    expect(levels).toEqual({
      debug: 10,
      info: 20,
      warn: 30,
      error: 40
    });
  });
});
