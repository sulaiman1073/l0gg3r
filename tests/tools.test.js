const {
  getLevelNum,
  getKeyByValue,
  isEveryArrayElementRedactString,
  stringify
} = require("../lib/tools");

describe("tools tests", () => {
  it("requiring tools should return four functions", () => {
    const tools = require("../lib/tools");
    const toolsEntries = Object.entries(tools);

    expect(toolsEntries.length).toBe(4);
  });

  it("getLevelNum should return level number if provided level word", () => {
    expect(getLevelNum("debug")).toBe(10);
    expect(getLevelNum("info")).toBe(20);
    expect(getLevelNum("warn")).toBe(30);
    expect(getLevelNum("error")).toBe(40);
  });

  it("getKeyByValue should the key of an object if provided the value of that key", () => {
    const obj = {
      a: 123,
      b: "abc"
    };

    expect(getKeyByValue(obj, 123)).toBe("a");
    expect(getKeyByValue(obj, "abc")).toBe("b");
  });

  it("isEveryArrayElementRedactString should work correctly", () => {
    expect(isEveryArrayElementRedactString(["a.b", "a.c"])).toBe(true);
    expect(isEveryArrayElementRedactString(["a.b", "a.c", 123])).toBe(false);
    expect(isEveryArrayElementRedactString(["a"])).toBe(false);
    expect(isEveryArrayElementRedactString([])).toBe(false);
  });

  it("stringify should work correctly", () => {
    expect(
      JSON.parse(
        stringify({
          a: 1,
          b: "abc",
          c: true
        })
      )
    ).toEqual({
      a: 1,
      b: "abc",
      c: true
    });
  });
});
