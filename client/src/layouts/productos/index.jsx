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
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useProductos } from "hooks/useProductos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductosPage() {
  const { data, getAllProductos } = useProductos();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllProductos();
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:2
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Productos Table</ArgonTypography>
              <Link to={"crear"}>
                <Button className="text-white" variant="contained">
                  Crear Nuevo Producto
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
                  { name: "price", label: "Precio", align: "left" },
                  { name: "quality", label: "Cantidad", align: "left" },
                  { name: "action", label: "Operaciones", align: "left" },
                ]}
                rows={data.map((i) => {
                  return {
                    ...i,
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
              {/* <div className="px-3">
                <div className="table-responsive">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th scope="col">CODE</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio</th>

                        <th scope="col">Cantidad</th>
                        <th scope="col">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((i) => (
                          <tr key={i.id} className="">
                            <td scope="row">{i.id} </td>
                            <td>{i.name}</td>
                            <td>{i.price}</td>
                            <td>{i.quality}</td>

                            <td></td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination count={10} variant="outlined" />
                </div>
              </div> */}
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}
