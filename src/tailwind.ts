import { twMerge } from "tailwind-merge";
import type { VariantNames, Variants, VariantProp } from "./merkmal";

export const VariantValue = Symbol("merkmal.tailwind.variantValue");

type TwMergeArgument = Parameters<typeof twMerge>[number];

export type TwMergeVariantSelector<
  TVariantName extends string,
  TVariantValue = string
> = ((
  variant: TVariantName,
  ...classLists: (TwMergeArgument | typeof VariantValue)[]
) => TVariantValue) & { readonly Value: typeof VariantValue };

/**
 * Create a variant selector function with the ability to merge
 * additional classes using [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
 *
 * You can apply the variant value after other values by passing `variantSelector.Value` as a classname:
 *
 * ```ts
 * sizeVariant("sm", "base-style", sizeVariant.Value)
 * ```
 *
 * @param variants available Variants with their classnames
 * @returns VariantSelector with the ability to merge additional tailwind classes
 */
export const variant = <TVariantName extends string>(
  variants: Variants<TVariantName, string>
): TwMergeVariantSelector<TVariantName> =>
  Object.assign(
    (
      variant: TVariantName,
      ...classLists: (TwMergeArgument | typeof VariantValue)[]
    ) =>
      twMerge(
        // TODO: Optimize performance
        classLists.includes(VariantValue) ? undefined : variants[variant],
        ...classLists.map((value) =>
          value === VariantValue ? variants[variant] : value
        )
      ),
    {
      Value: VariantValue as typeof VariantValue,
    }
  );

export type { VariantNames, Variants, VariantProp };
