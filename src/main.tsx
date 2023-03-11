import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";
import { queryClient } from "./services/queryClient";
import { theme } from "./styles/theme";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <App />
        </Providers>
      </QueryClientProvider>
    </ChakraProvider>
  </BrowserRouter>
);
