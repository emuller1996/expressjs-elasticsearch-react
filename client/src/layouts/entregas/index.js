import {
  Box,
  Button,
  Card,
  Modal,
  Pagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import MyModal from "components/_Modal";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useEntregas } from "hooks/useEntregas";
import { useProductos } from "hooks/useProductos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormEntregas from "./components/FormEntregas";
import { ViewDollar } from "utils";

export default function EntregasPage() {
  const { data, getAllEntregas } = useEntregas();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllEntregas();
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
              <ArgonTypography variant="h6">Entregas</ArgonTypography>
              <Button
                className="text-blue-50"
                variant="contained"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Crear Entrega
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
              <Table
                columns={[
                  { name: "id", label: "CODE", align: "left" },
                  { name: "date_delivery", label: "Fecha de Entrega", align: "left" },
                  { name: "status", label: "Estado", align: "left" },
                  { name: "total", label: "Valor Total", align: "left" },
                  { name: "total_p", label: "Numero de Productos", align: "left" },
                  { name: "date_delivered", label: "Fecha Entregado", align: "left" },
                  { name: "time_delivered", label: "Hora Entregada", align: "left" },

                  { name: "action", label: "Operaciones", align: "left" },
                ]}
                rows={data.map((i) => {
                  return {
                    ...i,
                    total:ViewDollar(i?.total),
                    total_p: i.products.length,
                    action: (
                      <>
                        <button
                          type="button"
                          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => {
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

        <MyModal title="Nueva Entrega" show={open} setShow={setOpen}>

          <FormEntregas />
        </MyModal>
      </ArgonBox>
    </DashboardLayout>
  );
}
