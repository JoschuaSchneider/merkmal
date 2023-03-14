export type Variants<TVariantName extends string, TVariantValue> = {
  [key in TVariantName]: TVariantValue;
};

/**
 * Returns the configured value for a given variant name.
 */
export type VariantSelector<TVariantName extends string, TVariantValue = string> = (
  variant: TVariantName
) => TVariantValue;

/**
 * Extracts the union of variant names from either a `VariantSelector` function or `Variants` object.
 */
export type VariantNames<
  TVariantSelector extends VariantSelector<any, any> | Variants<any, any>
> = TVariantSelector extends VariantSelector<infer TVariantName, any>
  ? TVariantName
  : TVariantSelector extends Variants<infer TVariantName, any>
  ? TVariantName
  : never;

/**
 * Convenience Type to create a prop object with a named key for a variant selector.
 *
 * ```ts
 * type MyComponentProps = VariantProp<typeof variantSelector, "propName">
 * ```
 */
export type VariantProp<
  TVariantSelector extends VariantSelector<any, any>,
  TPropName extends string = "variant"
> = {
  [key in TPropName]: VariantNames<TVariantSelector>;
};

/**
 * Creates a variant selector function.
 *
 * @param variants available Variants with their values
 * @returns VariantSelector function
 */
export const variant =
  <TVariantName extends string, TVariantValue = string>(
    variants: Variants<TVariantName, TVariantValue>
  ): VariantSelector<TVariantName, TVariantValue> =>
  (variant) =>
    variants[variant];
