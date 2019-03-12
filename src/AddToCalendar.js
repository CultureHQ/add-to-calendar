import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";

import makeUrls from "./makeUrls";

const useAutoFocus = () => {
  const ref = useRef(null);

  useEffect(
    () => {
      const { activeElement } = document;
      ref.current.focus();

      return () => activeElement.focus();
    },
    []
  );

  return ref;
};

const useOpenState = initialOpen => {
  const [open, setOpen] = useState(initialOpen);
  const onToggle = useCallback(() => setOpen(current => !current), [setOpen]);

  useEffect(
    () => {
      if (open) {
        const onClose = () => setOpen(false);
        document.addEventListener("click", onClose);

        return () => document.removeEventListener("click", onClose);
      }
    },
    [open, setOpen]
  );

  return [open, onToggle];
};

const Calendar = React.forwardRef(({ children, download = false, href }, ref) => (
  <a ref={ref} download={download} href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
));

const Dropdown = ({ urls }) => {
  const ref = useAutoFocus();

  return (
    <div className="chq-atc--dropdown">
      <Calendar href={urls.ics} download ref={ref}>
        Apple Calendar
      </Calendar>
      <Calendar href={urls.google}>
        Google
      </Calendar>
      <Calendar href={urls.ics} download>
        Outlook
      </Calendar>
      <Calendar href={urls.outlook}>
        Outlook Web App
      </Calendar>
      <Calendar href={urls.yahoo}>
        Yahoo
      </Calendar>
    </div>
  );
};

const AddToCalendar = ({ children = "Add to My Calendar", event, open: initialOpen }) => {
  const [open, onToggle] = useOpenState(initialOpen);
  const urls = useMemo(() => makeUrls(event), [event]);

  return (
    <div className="chq-atc">
      {event && (
        <button type="button" className="chq-atc--button" onClick={onToggle}>
          <svg width="20px" height="20px" viewBox="0 0 1024 1024">
            <path d="M704 192v-64h-32v64h-320v-64h-32v64h-192v704h768v-704h-192z M864 864h-704v-480h704v480z M864 352h-704v-128h160v64h32v-64h320v64h32v-64h160v128z" />
          </svg>
          {" "}
          {children}
        </button>
      )}
      {open && <Dropdown urls={urls} />}
    </div>
  );
};

export default AddToCalendar;
