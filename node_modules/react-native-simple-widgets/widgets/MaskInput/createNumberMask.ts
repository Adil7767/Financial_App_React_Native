import type { MaskArray } from "./formatWithMask.types";
import type { Mask } from "./formatWithMask.types";
import type { CreateNumberMaskProps } from "./createNumberMask.types";
import { localeCurrencyDecimalSeparator } from "../utils/currencyformat";

function createNumberMask(props?: CreateNumberMaskProps): Mask {
    const { delimiter = ".", precision = 2, prefix = ["R", "$", " "], separator = "," } =
        props || {};

    return (value?: string) => {
        const numericValue = value?.replace(/\D+/g, "") || "";

        const mask: MaskArray = numericValue.split("").map(() => /\d/);

        if (precision > 0 && mask.length > precision) {
            mask.splice(-precision, 0, separator);
        }

        const delimiters = Math.ceil((numericValue.length - precision) / 3) - 1;

        for (let i = 1; i <= delimiters; i++) {
            const position = -precision - i * 3 - (precision > 0 ? i : i - 1);
            mask.splice(position, 0, delimiter);
        }

        return [...prefix, ...mask];
    };
}

export const createNumberMaskByLocale = (locale): any => {
    const decimalSeparator = localeCurrencyDecimalSeparator(locale);

    return createNumberMask({
        prefix: [],
        separator: decimalSeparator,
        delimiter: decimalSeparator === "," ? "." : ",",
        precision: decimalSeparator === "," ? 0 : 2,
    });
};

export default createNumberMask;
