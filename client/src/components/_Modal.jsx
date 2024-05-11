import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";

export default function MyModal({ show, setShow, children, title }) {
  const style = {
    transform: "translate(-50%, -50%)",
  };
  return (
    <Modal
      open={show}
      /* onClose={() => setShow(false)} */
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="w-full md:w-1/2 overflow-hidden rounded-lg absolute top-1/2 left-1/2" sx={style}>
        <div className="flex justify-between px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500  rounded-t-md shadow-md ">
          <span className="uppercase text-white">{title}</span>
          <button onClick={() => setShow(false)}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 bg-gray-50 rounded-b-lg border-t-0 border  border-blue-400">{children}</div>
      </Box>
    </Modal>
  );
}

MyModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
