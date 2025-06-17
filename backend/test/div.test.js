import { div } from "../controllers/div.js";

test("adds 4/2 to equal 2", () => {
  expect(div(4, 2)).toBe(2);
});
