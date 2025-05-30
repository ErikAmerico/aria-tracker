import CalendarView from "./Calendar";
import StaticCalendarView from "./StaticCalendar";
import Confetti from "../Confetti";
import WentHomeDialogComponent from "../WentHomeDialog";
import FadeInWrapper from "./components/FadeInWrapper";
import CircularProgress from "@mui/material/CircularProgress";
import { RCOSCPropsType } from "@/types";

export default function CalendarOrStaticCalendar({
  clientId,
  showSpinner,
  readyToRenderCalendar,
  isDOMReady,
  staticVersion,
  setStaticVersion,
  wentHomeDialog,
  setWentHomeDialog,
}: RCOSCPropsType) {
  return (
    <>
      {staticVersion ? (
        <>
          {isDOMReady && (
            <FadeInWrapper>
              <StaticCalendarView />
              <WentHomeDialogComponent
                wentHomeDialog={wentHomeDialog}
                setWentHomeDialog={setWentHomeDialog}
                setStaticVersion={setStaticVersion}
              />
            </FadeInWrapper>
          )}
          <Confetti />
        </>
      ) : readyToRenderCalendar && isDOMReady ? (
        <FadeInWrapper>
          <CalendarView clientId={clientId!} />
        </FadeInWrapper>
      ) : showSpinner ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <CircularProgress />
          <p>Looking for your ID number...</p>
        </div>
      ) : null}
    </>
  );
}
