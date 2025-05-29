import { EventClickArg } from "@fullcalendar/core";
import { Dispatch, SetStateAction } from "react";

//Calendar.tsx
export interface CalendarEventType {
  id: string;
  title: string;
  start: string;
  end: string;
}

//Calendar.tsx
export interface SelectedRangeType {
  start: string;
  end: string;
}

//Calendar.tsx
export interface SnackbarType {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

//Calendar.tsx
export interface TimeBlockType {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  clientId: string;
}

//Calendar.tsx
export interface clientIdType {
  clientId: string;
}

//EditTimeBlockDialog.tsx
export interface ETBCPropsType {
  clientId: string;
  clickedEvent: EventClickArg | null;
  setClickedEvent: Dispatch<SetStateAction<EventClickArg | null>>;
  editValue: string;
  setEditValue: Dispatch<SetStateAction<string>>;
  setEvents: Dispatch<SetStateAction<CalendarEventType[]>>;
  setSnackbar: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      severity: "success" | "error" | "info" | "warning";
    }>
  >;
}

//WentHomeDialog.tsx
export interface WHDCPropsType {
  wentHomeDialog: boolean;
  setWentHomeDialog: Dispatch<SetStateAction<boolean>>;
}

//StaticCalendar.tsx
export interface StaticCalendarEventType {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

//HowToDialog.tsx
export interface HTDCPropsType {
  howToDialog: boolean;
  setHowToDialog: Dispatch<SetStateAction<boolean>>;
  staticVersion: boolean;
  setStaticVersion: Dispatch<SetStateAction<boolean>>;
}

//DirectionDialog.tsx
export interface DDCPropsType {
  openDirectionsDialog: boolean;
  setOpenDirectionsDialog: Dispatch<SetStateAction<boolean>>;
}

//timbeBlockDialog.tsx
export interface TBDCPropsType {
  clientId: string;
  isModalOpen: boolean;
  handleCancel: () => void;
  selectedRange: { start: string; end: string } | null;
  formValue: string;
  setFormValue: Dispatch<SetStateAction<string>>;
  setSnackbar: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      severity: "success" | "error" | "info" | "warning";
    }>
  >;
}

//usePusherCalendar.tsx
export interface UPCPropsType {
  setEvents: Dispatch<SetStateAction<CalendarEventType[]>>;
}
