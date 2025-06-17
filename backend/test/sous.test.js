import { sous } from "../controllers/sous.js";

test("adds 5 - 2 to equal 3", () => {
  expect(sous(5, 2)).toBe(3);
});
