import clsx from "clsx";
import type { VariantNames, Variants, VariantProp } from "./merkmal";

export const VariantValue = Symbol("merkmal.clsx.variantValue");

type ClsxArgument = Parameters<typeof clsx>[number];

export type ClsxVariantSelector<
  TVariantName extends string,
  TVariantValue = string
> = ((
  variant: TVariantName,
  ...classLists: (ClsxArgument | typeof VariantValue)[]
) => TVariantValue) & { readonly Value: typeof VariantValue };

/**
 * Create a variant selector function with the ability to merge
 * additional classes using [clsx](https://www.npmjs.com/package/clsx)
 *
 * You can apply the variant value after other values by passing `variantSelector.Value` as a classname:
 *
 * ```ts
 * sizeVariant("sm", "base-style", sizeVariant.Value)
 * ```
 *
 * @param variants available Variants with their classnames
 * @returns VariantSelector with the ability to merge additional classes
 */
export const variant = <TVariantName extends string>(
  variants: Variants<TVariantName, string>
): ClsxVariantSelector<TVariantName> =>
  Object.assign(
    (
      variant: TVariantName,
      ...classLists: (ClsxArgument | typeof VariantValue)[]
    ) =>
      clsx(
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
