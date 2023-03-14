import { expectTypeOf, test } from "vitest";
import { variant, VariantProp } from "./merkmal";

test("VariantSelector parameter should be a union of all variant names", () => {
  const sizeVariant = variant({
    sm: "sm",
    md: "md",
    lg: "lg",
  });

  expectTypeOf(sizeVariant).parameter(0).toMatchTypeOf<"sm" | "md" | "lg">();
});

test("VariantSelector return type should be inferred", () => {
  const numberVariant = variant({
    sm: 1,
    md: 2,
    lg: 3,
  });

  const stringVariant = variant({
    sm: "string",
    md: "string",
    lg: "string",
  });

  const mixedVariant = variant({
    sm: "string",
    md: 1,
    lg: new Date(),
  });

  expectTypeOf(numberVariant).returns.toMatchTypeOf<number>();
  expectTypeOf(stringVariant).returns.toMatchTypeOf<string>();
  expectTypeOf(mixedVariant).returns.toMatchTypeOf<string | number | Date>();
});

test("VariantProp should provide a key and value", () => {
  const sizeVariant = variant({
    sm: "sm",
    md: "md",
    lg: "lg",
  });

  type MyComponentProps = VariantProp<typeof sizeVariant>;

  const myProps: MyComponentProps = {
    variant: "sm",
  };

  expectTypeOf(myProps).toMatchTypeOf<{ variant: "sm" | "md" | "lg" }>();

  type MyCustomComponentProps = VariantProp<typeof sizeVariant, "size">;

  const myCustomProps: MyCustomComponentProps = {
    size: "sm",
  };

  expectTypeOf(myCustomProps).toMatchTypeOf<{ size: "sm" | "md" | "lg" }>();
});
