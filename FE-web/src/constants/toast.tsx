import { ToastPosition, toast } from "material-react-toastify";

export const notifyToast = (
  type: string,
  text: string,
  t?: (text: string) => string,
  position: ToastPosition | undefined = "top-center",
  autoClose: number = 4000,
  hideProgressBar: boolean = true,
  closeOnClick: boolean = true,
  pauseOnHover: boolean = true,
  draggable: boolean = true,
) => {
  switch (type) {
    case "default":
      return toast(t ? t(text) : text, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
      });
    case "error":
      return toast.error(t ? t(text) : text, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
      });
  }
};
