import { expect, expectTypeOf, test } from "vitest";
import { variant } from "./merkmal.js";

test("should return selector function", () => {
  const sizeVariant = variant({
    sm: "sm",
    md: "md",
    lg: "lg",
  });

  expect(sizeVariant).toBeTypeOf("function");
});

test("selector function should return values for each variant", () => {
  const sizeVariant = variant({
    sm: "sm",
    md: "md",
    lg: "lg",
  });

  expect(sizeVariant("sm")).toEqual("sm");
  expect(sizeVariant("md")).toEqual("md");
  expect(sizeVariant("lg")).toEqual("lg");
});
