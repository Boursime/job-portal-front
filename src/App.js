import AppRoutes from "./routes/routes";
import { Button } from "./components/ui/button"
import "./styles/tailwind.css"
function App() {
  return (
    <div className="App">
      <Button>Cliquez ici</Button>
      <Button variant="secondary">Bouton secondaire</Button>
      <Button variant="destructive">Supprimer</Button>
    </div> 
  );
}

export default App;
