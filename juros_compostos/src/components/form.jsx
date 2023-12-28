import "../styles/Form.sass";
import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [monthly, setMonthly] = useState(0);
  const [years, setYears] = useState();
  const [result, setResult] = useState(false);
  const [apiGet, setApiGet] = useState(false);

  const handleName = (e) => {
    let nameValue = e.target.value;
    setName(nameValue);
  };
  const handleMonthly = (e) => {
    let monthlyValue = e.target.value;
    setMonthly(monthlyValue);
  };

  const handleYears = (e) => {
    let yearsValue = e.target.value;
    setYears(yearsValue);
  };

  const calculate = async (e) => {
    e.preventDefault();
    try {
      const expression = monthly * (((1 + 0.00517) ** years - 1) / 0.00517);
      const url = encodeURIComponent(expression);
      const api = await fetch(`https://api.mathjs.org/v4/?expr=${url}`).then(
        (res) => res.json()
      );
      setApiGet(api)
      setResult(true);
      console.log(api);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      {result === false ? (
        <>
          <input
            type="text"
            name=""
            id="text"
            placeholder="Digite seu nome: "
            value={name}
            onChange={handleName}
          />
          <input
            type="number"
            name=""
            id="number"
            placeholder="Digite o valor mensal"
            value={monthly}
            onChange={handleMonthly}
          />

          <label htmlFor="selec">Anos</label>
          <select name="" id="selec" onChange={handleYears}>
            <option value={null}>Tempo de aplicação</option>
            <option value="12">1</option>
            <option value="24">2</option>
            <option value="36">3</option>
          </select>
          <button onClick={calculate}>Calcular</button>
        </>
      ) : (
        <section id="res">
        <p>Olá {name},</p>
        <p>Valor investido por mês: R$ {monthly},00</p>
        <p>Tempo de aplicação: {years} meses</p>
        <p>Retorno com juros: R$ {apiGet.toFixed(0)},00</p>
        <button id="again">Simular Novamente</button>
        </section>
        
        
      )}
    </form>
  );
}
