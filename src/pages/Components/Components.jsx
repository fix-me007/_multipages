import Add from "../../components/Add/Add";
import Counter from "../../components/Counter/Counter";
import Temperature from "../../components/Temperature/Temperature";
import TimerCompo from "../../components/Timer/Timer";

// import './Components.css'

function Components() {
  return (
    <main className="container bg-custom d-flex flex-column gap-3 text-center">
      <h3 className="display-6">React Components</h3>
      <section className="d-flex gap-3">
        <div className="flex-shrink-0" style={{ width: "400px" }}>
          <div className="d-flex flex-column gap-3">
            <Counter name={"Counter"} value={0} />
            <TimerCompo name={"Timer"} value={10} />
          </div>
        </div>
        <div className="flex-grow-1">
          <Add v1={10} v2={30} />
        </div>
      </section>
      <Temperature initCelsius={0} />
      <h3 className="display-6">name</h3>
    </main>
  );
}

export default Components;
