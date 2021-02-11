import React from "react";
import { CalendarEvent } from "./makeUrls";
declare type AddToCalendarProps = {
    event: CalendarEvent;
    open?: boolean;
    filename?: string;
};
declare const AddToCalendar: React.FC<AddToCalendarProps>;
export default AddToCalendar;
