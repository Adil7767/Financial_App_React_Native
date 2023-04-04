import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";

import { Calendar } from "./Calendar";

dayjs.extend(duration);
dayjs.extend(isBetween);

export * from "./Calendar";
export * from "./CalendarBody";
export * from "./CalendarBodyForMonthView";
export * from "./CalendarEvent";
export * from "./CalendarEventForMonthView";
export * from "./CalendarHeader";
export * from "./CalendarHeaderForMonthView";
export * from "./DefaultCalendarEventRenderer";

export * from "./styles/commonStyles";
export * from "./interfaces";
export * from "./theme/ThemeContext";
export * from "./theme/ThemeInterface";
export * from "./theme/defaultTheme";
export * from "./utils";

export * from "./interfaces";

/* eslint-disable */
export default Calendar
