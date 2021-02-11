export interface CalendarEvent {
    name: string;
    details: string | null;
    location: string | null;
    startsAt: string;
    endsAt: string;
    addresses?: string[];
}
declare type URLSet = {
    [key: string]: string;
};
declare const makeUrls: (event: CalendarEvent) => URLSet;
export default makeUrls;
