import dateAdd from "date-fns/add";
import dateParseJSON from "date-fns/parseJSON";
import dateParse from "date-fns/parse";
import dateFormat from "date-fns/format";
import dateFormatDistance from "date-fns/formatDistance";
import dateFormatRelative from "date-fns/formatRelative";

export const TIME_FORMAT_ISO_STRING = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

export const newUTCDateTimeString = () => {
    return dateParseJSON((new Date()).toISOString());
};

/**
 * format UTC time with a duration
 * @param duration ex: { hours: 1 }
 * @returns string
 */
export const newUTCDateTimeAndDurationString = (duration) => {
    return dateAdd(dateParseJSON((new Date()).toISOString()), duration);
};

export const parse = (timeStr: string, format) => {
    return dateParse(timeStr, format, new Date());
};

export const parseSavedTime = (timeStr: string) => {
    return dateParseJSON(timeStr);
};

export const format = (time: Date, format = TIME_FORMAT_ISO_STRING) => {
    return dateFormat(time, format);
};

// How many
export const formatDistance = (time1: Date, time2: Date) => {
    return dateFormatDistance(time1, time2);
};

export const formatDistanceToNow = (time: Date) => {
    return dateFormatDistance(time, new Date());
};

// When
export const formatRelative = (time1: Date, time2: Date) => {
    return dateFormatRelative(time1, time2);
};

export const formatRelativeToNow = (time: Date) => {
    return dateFormatRelative(time, new Date());
};
