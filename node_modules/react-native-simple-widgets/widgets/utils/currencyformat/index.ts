import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/vi";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
const formatCurrency = (amount, locale = "en-US", currency = "USD", currencyDisplay = "symbol") => {
    const formatter =  new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency || "USD",
        currencyDisplay: currencyDisplay,
    });

    return formatter.format(amount).toString();
};

const localeCurrencyFormat = (
    amount = 0,
    locale = "en-GB",
    currencyCode = "USD",
    currencyDisplay = "symbol"
) => {
    const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay,
    });

    return formatter.format(amount);
};

const localeCurrencyDecimalFormat = (amount = 0, locale = "en-GB") => {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(amount);
};

const localeCurrencyDecimalSeparator = (locale = "en-GB") => {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(1.2).substring(1, 2);
};

export {
    formatCurrency,
    localeCurrencyFormat,
    localeCurrencyDecimalFormat,
    localeCurrencyDecimalSeparator,
};
