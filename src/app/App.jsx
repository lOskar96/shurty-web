import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/Header/Header";
import ThemeProvider from "../components/ThemeProvider";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Header />
          <AppRoutes />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
