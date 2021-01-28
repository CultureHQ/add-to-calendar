import React from "react";
import { CalendarEvent } from "./makeUrls";
declare type OpenStateToggle = (event?: React.MouseEvent) => void;
declare type AddToCalendarProps = {
    event: CalendarEvent;
    open?: boolean;
    showIcon?: boolean;
    filename?: string;
    handleClick?: (event: React.MouseEvent, onToggle: OpenStateToggle) => void;
};
declare const AddToCalendar: React.FC<AddToCalendarProps>;
export default AddToCalendar;
