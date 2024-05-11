import { useEntregas } from "hooks/useEntregas";
import { useProductos } from "hooks/useProductos";
import { useRutas } from "hooks/useRutas";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createEntregasService } from "services/entregas.services";
import { createProgramacionRutasService } from "services/programacion-rutas.services";
import { ViewDollar } from "utils";

export default function FormEntregas() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.products = ProdSelected;
    data.status = "PENDIENTE";
    data.total = ProdSelected.reduce(
      (acumulador, actual) => acumulador + actual?.price * actual?.quality,
      0
    );

    data.time_delivered = null;
    data.date_delivered = null;
    try {
      console.log(data);
      const result = await createEntregasService(data);
      reset();
      await getAllProductos();
      setProdSelected([]);
      alert(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: ListProductos, getAllProductos } = useProductos();

  const [ProdSelected, setProdSelected] = useState([]);
  useEffect(() => {
    getAllProductos();
  }, []);

  return (
    <div className="px-4 ">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <div className="mb-4">
              <label
                htmlFor="date_start"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha Entrega
              </label>
              <input
                type="date"
                id="date_delivery"
                {...register("date_delivery", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <span>Producto Selecionados</span>
              {ProdSelected.map((p) => (
                <div
                  key={p.id}
                  className="border border-blue-300 bg-blue-200 px-5 py-2 mb-2 rounded-md"
                >
                  <span className="block text-sm text-blue-900 font-semibold">{p?.name}</span>
                  <span className="block text-sm text-blue-900 font-semibold">
                    Precio {ViewDollar(p?.price)}
                  </span>
                  <span className="block text-sm text-blue-900 font-semibold">
                    Cantidad :{p?.quality}
                  </span>
                </div>
              ))}

              <p className="text-end">
                {ViewDollar(
                  ProdSelected.reduce(
                    (acumulador, actual) => acumulador + actual?.price * actual?.quality,
                    0
                  )
                )}
              </p>
            </div>
          </div>

          <div className="h-[500px] overflow-scroll">
            <div className="flex flex-col gap-2">
              {ListProductos.map((p) => (
                <>
                  <div
                    className="flex gap-2 flex-col border border-blue-200 rounded p-2"
                    key={p.id}
                  >
                    <span>{p?.name}</span>
                    <div className="grid gap-12 md:grid-cols-2">
                      <div className="">
                        <label
                          htmlFor="date_start"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Precio
                        </label>
                        <input
                          type="number"
                          defaultValue={p?.price}
                          onChange={(e) => {
                            p.price = parseInt(e.target.value);
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <div className="">
                        <label
                          htmlFor="date_start"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Cantidad
                        </label>
                        <input
                          type="number"
                          onChange={(e) => {
                            p.quality = parseInt(e.target.value);
                          }}
                          defaultValue={p?.quality}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setProdSelected((status) => {
                            return [...status, p];
                          });
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
