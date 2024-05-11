import { useEntregas } from "hooks/useEntregas";
import { useRutas } from "hooks/useRutas";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProgramacionRutasService } from "services/programacion-rutas.services";

export default function FormProgramacionRuta() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const r = await createProgramacionRutasService(data);
      alert(r.data.message);
      reset();
      await getAllRutas();
      await getAllEntregas();
    } catch (error) {
      console.log(error);
    }
  };

  const { data: listRutas, getAllRutas } = useRutas();
  const { data: listEntregas, getAllEntregas } = useEntregas();

  useEffect(() => {
    getAllRutas();
    getAllEntregas();
  }, []);

  return (
    <div className="px-4 ">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="date_start"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fecha y Hora de Inicio
            </label>
            <input
              type="datetime-local"
              id="date_start"
              {...register("date_start", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="date_end"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fecha y Hora de Fin
            </label>
            <input
              type="datetime-local"
              id="date_end"
              {...register("date_end", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <fieldset>
              <small className="">Selecione una Ruta</small>
              {listRutas &&
                listRutas.map((c) => (
                  <div key={c.id} className="flex items-center mb-4">
                    <input
                      id={c.id}
                      type="radio"
                      name="ruta_id"
                      value={c.id}
                      {...register("ruta_id", { required: true })}
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={c.id}
                      className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
            </fieldset>
          </div>

          <div className="ps-2 h-[450px] overflow-y-scroll">
            <fieldset>
              <small className="">Selecione las Entregas</small>
              {listEntregas.map((i) => (
                <div key={i.id} className="flex  items-center mb-4 ">
                  <div className="flex items-center h-5 ">
                    <input
                      id={i.id}
                      aria-describedby="helper-checkbox-text"
                      type="checkbox"
                      value={i.id}
                      {...register("deliverys", { required: true })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="ms-2 text-sm border w-full p-1 rounded-xl">
                    <label
                      htmlFor={i.id}
                      className="font-medium text-gray-900 dark:text-gray-300  "
                    >
                      <small className="block">{i.date_delivery}</small>
                      <span
                        id="helper-checkbox-text"
                        className="block text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        {i.status}
                      </span>
                      <span
                        id="helper-checkbox-text"
                        className="block text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        {i.total}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </fieldset>
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
