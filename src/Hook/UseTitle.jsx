import { useEffect } from "react";

const useTitle = (title = "") => {
  useEffect(() => {
    document.title = title + " - My Store";
  }, [title]);
};

export default useTitle;
