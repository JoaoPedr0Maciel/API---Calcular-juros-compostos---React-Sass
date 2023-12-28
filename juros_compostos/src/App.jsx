import ciclic from "../src/assets/ciclic.png";
import Form from "./components/form";
import "./styles/app.sass";

function App() {
  return (
    <main>
      <img src={ciclic} alt="logo" />
      <section>
        <h1>Simulador juros compostos</h1>
        <Form />
      </section>
    </main>
  );
}

export default App;
