describe("logger tests", () => {
  it("requiring l0gg3r should return a function", () => {
    const l0gg3r = require("../lib/logger");

    expect(typeof l0gg3r).toBe("function");
  });

  it("calling l0gg3r should return an object", () => {
    const l0gg3r = require("../lib/logger")();

    expect(typeof l0gg3r).toBe("object");
  });

  it("l0gg3r should expose serializers and transports and they should be objects exposing the right serializers and transports", () => {
    const { serializers, transports } = require("../lib/logger");

    const serializersEntries = Object.entries(serializers);
    const transportsEntries = Object.entries(transports);

    expect(typeof serializers).toBe("object");
    expect(typeof transports).toBe("object");

    expect(serializersEntries.length).toBe(3);

    expect(serializersEntries[0][0]).toBe("json");
    expect(serializersEntries[1][0]).toBe("prettyConsole");
    expect(serializersEntries[2][0]).toBe("prettyFile");

    expect(typeof serializersEntries[0][1]).toBe("function");
    expect(typeof serializersEntries[1][1]).toBe("function");
    expect(typeof serializersEntries[2][1]).toBe("function");

    expect(transportsEntries.length).toBe(2);

    expect(transportsEntries[0][0]).toBe("consoleTransport");
    expect(transportsEntries[1][0]).toBe("fileTransport");

    expect(typeof serializersEntries[0][1]).toBe("function");
    expect(typeof serializersEntries[1][1]).toBe("function");
  });

  it("called l0gger function should expose the logging methods and transports", () => {
    const l0gg3r = require("../lib/logger")();
    const loggerEntries = Object.entries(l0gg3r);

    expect(loggerEntries.length).toBe(5);
    expect(loggerEntries[0][0]).toBe("transports");
    expect(loggerEntries[1][0]).toBe("debug");
    expect(loggerEntries[2][0]).toBe("info");
    expect(loggerEntries[3][0]).toBe("warn");
    expect(loggerEntries[4][0]).toBe("error");

    expect(typeof loggerEntries[1][1]).toBe("function");
    expect(typeof loggerEntries[2][1]).toBe("function");
    expect(typeof loggerEntries[3][1]).toBe("function");
    expect(typeof loggerEntries[4][1]).toBe("function");
  });
});
