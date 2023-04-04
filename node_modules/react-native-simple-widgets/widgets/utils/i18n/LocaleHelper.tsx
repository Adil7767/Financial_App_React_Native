import { getCurrentLocale, translate } from "./LocaleProvider";
import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/vi";
import "intl-list-format";
import "intl-list-format/locale-data/en";
import "intl-list-format/locale-data/vi";

const defaultLocale = "en";
export const numberFormat = (
    number = 0,
    formatOptions = {},
    locale = getCurrentLocale() || defaultLocale,
) =>
    new Intl.NumberFormat(locale, { style: "decimal", ...formatOptions }).format(
        number
    );

export const listFormat = (
    list = [],
    formatOptions = {},
    locale = getCurrentLocale() || defaultLocale,
) =>
    // @ts-ignore
    new Intl.ListFormat(locale, {
        style: "long",
        type: "unit",
        ...formatOptions,
    }).format(list);

export const getDisplayAddress = ({
    line_1 = "",
    line_2 = "",
    city = "",
    state_province_name = "",
    country = "",
    postal_code = "",
}) => {
    const addressArray = [line_1, line_2, city, state_province_name, country];
    return `${addressArray
        .map(item => item.trim())
        .filter(Boolean)
        .join(", ")} ${postal_code}`;
};

export const getRoomBedTypeAndRoomSize = ({ bedSize, squareMeterArea }) =>
    `${bedSize ? bedSize : ""}${bedSize && squareMeterArea ? " | " : ""}${squareMeterArea
        ? translate("roomCard.squareMeter", { squareMeterArea })
        : ""
    }`;

export const createScopedTranslate = scopedKey => (key, ...restArgs) =>
    translate(`${scopedKey}.${key}`, ...restArgs);

export const getCountryFromLocale = ({ languageId, countries }) => {
    const languageCountryCode = languageId.split("-")[1];
    const country = countries.find(
        ({ countryCode }) => countryCode === languageCountryCode.toUpperCase()
    );
    return country;
};

export const getDefaultNationality = ({
    countryCode,
    languageId,
    countries,
}) => {
    let defaultNationality = countries.find(
        ({ countryCode: cc }) => cc === countryCode
    ) || { countryCode: "VN" };

    if (languageId && languageId !== "en-gb") {
        defaultNationality =
            getCountryFromLocale({ languageId, countries }) || defaultNationality;
    }

    return defaultNationality;
};

export const convertTagToTranslationID = tag => {
    if (typeof tag === "string") {
        return tag;
    }
    const { translationId = "", numberOfRooms, value = "" } = tag;
    const translatedTag = translate(translationId, {
        smart_count: numberOfRooms,
    });
    if (translatedTag && translatedTag !== translationId) {
        return translatedTag;
    }
    return value;
};

const CHINA_LOCALES = ["zh-cn", "zh-tw", "zh-hk"];
export const getDiscountPercentageLocale = (percent, locale) => {
    if (CHINA_LOCALES.includes(locale)) {
        return (100 - percent) / 10;
    }
    return percent;
};
