import {
    format,
    parse,
    parseISO,
    differenceInCalendarDays,
    differenceInYears,
    differenceInDays,
    compareAsc,
    isValid,
    startOfDay,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const ISO_DATE_FORMAT = "yyyy-MM-dd";
const DAY_WITHOUT_YEAR_FORMAT = "dd MMM";
const API_DATE_FORMAT = "yyyy-MM-dd";
const API_DATETIME_FORMAT = "yyyy-MM-dd HH:mm";
const TIME_FORMAT = "HH:mm";
const REFUND_DATE_FORMAT = "ccc, dd LLLL";
const SHORT_DATE_FORMAT = "ccc, dd LLL"; // Eg. Thu, 22 Oct
const REVERSE_SHORT_DATE_FORMAT = "dd LLL, ccc";
const API_DURATION_FORMAT = "H:m'";
const DURATION_FORMAT = "H'h' m'm'"; // 1h 15m
const DATE_FORMAT_DEFAULT = "dd/MM/yyyy";
const TIMELINE_LOCAL_TIME_LONG_FORMAT = "d MMM, h:mmaaaaa'm'";
const TIMELINE_LOCAL_TIME_LONGER_FORMAT = "do MMMM yyyy, h:mmaaaaa'm'";
const TIMELINE_LOCAL_TIME_SHORT_FORMAT = "d MMM";
const TIMELINE_DESTINATION_TIME_FORMAT = "h:mma";

const formatTime = (day, timeFormat) => format(day, timeFormat);
const formatAPIDayParam = day => formatTime(day, API_DATE_FORMAT);
const formatDisplayDay = (day, dateFormat = DAY_WITHOUT_YEAR_FORMAT) =>
    formatTime(day, dateFormat);
const formatRefundDate = day => formatTime(day, REFUND_DATE_FORMAT);
const formatShortDate = day => formatTime(parseAPIDay(day), SHORT_DATE_FORMAT);
const formatDisplayDuration = time => formatTime(time, DURATION_FORMAT);

const formatLongLocalTime = day => {
    return formatZonedTime(parseISO(day));
};

const formatLongerLocalTime = day => {
    return formatZonedTime(parseISO(day), TIMELINE_LOCAL_TIME_LONGER_FORMAT);
};

const formatShortLocalTime = day =>
    formatTime(day, TIMELINE_LOCAL_TIME_SHORT_FORMAT);
const formatDestinationDate = day =>
    formatTime(day, TIMELINE_DESTINATION_TIME_FORMAT);

const formatZonedTime = (day, pattern?) => {
    return format(day, pattern || TIMELINE_LOCAL_TIME_LONG_FORMAT);
};

const compareTime = (time1, time2) => compareAsc(time1, time2);

const countNights = (checkIn, checkOut) =>
    differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

const parseAPIDay = (day, dateFormat = API_DATE_FORMAT) =>
    parse(day, dateFormat, new Date());

const parseFormDay = (day, dateFormat = DATE_FORMAT_DEFAULT) =>
    parse(day, dateFormat, new Date());

const isValidTime = (time, dateFormat = DATE_FORMAT_DEFAULT) =>
    isValid(parseFormDay(time, dateFormat));

const getDateFormat = () => DATE_FORMAT_DEFAULT;

const getDurationInDays = (startTime, endTime) =>
    differenceInDays(parseAPIDay(endTime), parseAPIDay(startTime));

const countYears = (startDate, endDate) =>
    differenceInYears(new Date(endDate), new Date(startDate));

const convertTimeFormat = (time, fromFormat, toFormat) => {
    const parseTime = parse(time, fromFormat, new Date());
    return format(parseTime, toFormat);
};

const convertToDestinationTimezone = (date, destinationTimezone) => {
    return utcToZonedTime(parseISO(date), destinationTimezone);
};

const differenceInDaysFromCurrentDate = checkin =>
    differenceInDays(parseAPIDay(checkin), startOfDay(new Date()));

export {
    DAY_WITHOUT_YEAR_FORMAT,
    API_DATE_FORMAT,
    SHORT_DATE_FORMAT,
    REVERSE_SHORT_DATE_FORMAT,
    API_DURATION_FORMAT,
    API_DATETIME_FORMAT,
    DURATION_FORMAT,
    DATE_FORMAT_DEFAULT,
    ISO_DATE_FORMAT,
    TIMELINE_LOCAL_TIME_LONG_FORMAT,
    TIMELINE_LOCAL_TIME_SHORT_FORMAT,
    TIMELINE_DESTINATION_TIME_FORMAT,
    TIME_FORMAT,
    getDateFormat,
    formatTime,
    formatZonedTime,
    formatAPIDayParam,
    formatDisplayDay,
    formatRefundDate,
    formatDisplayDuration,
    formatShortDate,
    formatShortLocalTime,
    formatLongLocalTime,
    formatLongerLocalTime,
    formatDestinationDate,
    parseAPIDay,
    countNights,
    parseFormDay,
    compareTime,
    isValidTime,
    getDurationInDays,
    countYears,
    convertTimeFormat,
    convertToDestinationTimezone,
    differenceInDaysFromCurrentDate,
};
