import { Button, Card } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useProgramacionRutas } from "hooks/useProgramacionRutas";
import { Calendar } from "@fullcalendar/core";
import MyModal from "components/_Modal";
import FormProgramacionRuta from "./components/FormProgramacionRuta";
import "./index.css";
import esLocale from "@fullcalendar/core/locales/es";
// a custom render function
function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <div className="bg-blue-200 rounded-md flex flex-col text-gray-950 p-1">
      <b className="text-xs">{eventInfo.timeText}</b>
      <span className="text-sm">{eventInfo.event.title}</span>
      <div className="text-center">
        <button
          type="button"
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            alert(eventInfo.event._def.extendedProps.id);
          }}
        >
          Ver Detalle
        </button>
      </div>
    </div>
  );
}
export default function ProgramacionRutasPage() {
  const { data, getAllProgramacionRutas } = useProgramacionRutas();
  const [open, setOpen] = useState(false);

  const events = [{ title: "Meeting", start: new Date() }];

  useEffect(() => {
    getAllProgramacionRutas();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Programacion de Rutas</ArgonTypography>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="text-white"
                variant="contained"
              >
                Programar Ruta
              </Button>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <div className="px-8">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    start: "title",
                    center: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  locale={esLocale}
                  allDaySlot={false}
                  allDayText=""
                  events={data.map((i) => {
                    return {
                      title: i.ruta.name,
                      start: i.date_start,
                      end: i?.date_end,
                      extendedProps: {
                        id: i?.id,
                      },
                    };
                  })}
                  eventContent={renderEventContent}
                />
              </div>
            </ArgonBox>
          </Card>
        </ArgonBox>
        <MyModal show={open} setShow={setOpen}>
          <FormProgramacionRuta />
        </MyModal>
      </ArgonBox>
    </DashboardLayout>
  );
}
