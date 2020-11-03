const f = x => y => y + x;

describe("function", () => {
  it("should return a function", () => {
    expect(typeof f(0)).toBe("function");
  });
});
