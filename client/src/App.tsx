import { AppProvider } from "@/contexts/AppContext";
import { WorkflowConsolePage } from "@/pages/WorkflowConsolePage";

function App() {
  return (
    <AppProvider>
      <WorkflowConsolePage />
    </AppProvider>
  );
}

export default App;
