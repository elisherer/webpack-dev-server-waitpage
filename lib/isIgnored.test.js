const isIgnored = require("./isIgnored");

module.exports = (test) => {
  test("isIgnored - string - success", (t) => {
    const req = { url: "/api/pets" };
    const ignore = "/api/pets";

    t.ok(isIgnored(ignore, req));
  });

  test("isIgnored - string - fail", (t) => {
    const req = { url: "/api/pets/1" };
    const ignore = "/api/pets";

    t.notOk(isIgnored(ignore, req));
  });

  test("isIgnored - RegExp - success", (t) => {
    const req = { url: "/api/pets/1" };
    const ignore = /^\/api\/pets/;

    t.ok(isIgnored(ignore, req));
  });

  test("isIgnored - RegExp - fail", (t) => {
    const req = { url: "/api/store" };
    const ignore = /^\/api\/pets/;

    t.notOk(isIgnored(ignore, req));
  });

  test("isIgnored - Function - success", (t) => {
    const req = { headers: { "x-ignore": "true" } };
    const ignore = (req) => Boolean(req.headers["x-ignore"]);

    t.ok(isIgnored(ignore, req));
  });

  test("isIgnored - Function - fail", (t) => {
    const req = { url: "/api/store-pets", headers: {} };
    const ignore = (req) => Boolean(req.headers["x-ignore"]);

    t.notOk(isIgnored(ignore, req));
  });

  test("isIgnored - Array - success", (t) => {
    const req = { url: "/api/pets" };
    const ignore = ["/api/store", /^\/api\/pets/];

    t.ok(isIgnored(ignore, req));
  });

  test("isIgnored - Array - success (with function)", (t) => {
    const req = { url: "/api/ex", headers: { "x-ignore": "true" } };
    const ignore = [
      "/api/store",
      /^\/api\/pets/,
      (req) => Boolean(req.headers["x-ignore"]),
    ];

    t.ok(isIgnored(ignore, req));
  });

  test("isIgnored - Array - fail", (t) => {
    const req = { url: "/api/store-pets" };
    const ignore = ["/api/store", /^\/api\/pets/];

    t.notOk(isIgnored(ignore, req));
  });
};
