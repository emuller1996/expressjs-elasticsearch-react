import { Button, Card } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useRutas } from "hooks/useRutas";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RutasPage() {
  const { data, getAllRutas } = useRutas();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllRutas();
  }, []);

  const rows = [
    {
      test: "test",

      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </ArgonTypography>
      ),
      action: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Rutas</ArgonTypography>
              <Link to={"crear"}>
                <Button className="text-white" variant="contained">
                  Crear Nuevo Ruta
                </Button>
              </Link>
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
              <Table
                columns={[
                  { name: "id", label: "CODE", align: "left" },
                  { name: "name", label: "Nombre", align: "left" },
                  { name: "duration", label: "duration", align: "left" },
                  { name: "kilometers", label: "kilometers", align: "left" },
                  { name: "cost", label: "cost", align: "left" },

                  { name: "action", label: "Operaciones", align: "left" },
                ]}
                rows={data.map((i) => {
                  return {
                    ...i,
                    total_p: i?.products?.length,
                    action: (
                      <>
                        <button
                          type="button"
                          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => {
                            setOpen(true);
                            console.log("qlq");
                          }}
                        >
                          Edit
                        </button>
                      </>
                    ),
                  };
                })}
              />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}
