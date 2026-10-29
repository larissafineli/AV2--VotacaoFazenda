import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  zerarVotos,
  calcularTotalVotos,
  calcularResultado,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <h1>Parcial da eliminação</h1>
      <p className="total">
        <strong>{total}</strong> {total === 1 ? 'voto computado' : 'votos computados'}
      </p>

      {total === 0 ? (
        <div className="vazio">
          <p>Ainda não há votos. Que tal ser o primeiro a votar?</p>
          <Link to="/votacao" className="botao botao-principal">Ir para a votação</Link>
        </div>
      ) : (
        <ul className="placar">
          {resultado.map((p, i) => (
            <li key={p.id} className={i === 0 ? 'placar-item placar-lider' : 'placar-item'}>
              <img src={p.foto} alt={p.nome} className="placar-foto" />
              <div className="placar-info">
                <div className="placar-topo">
                  <h3>{p.nome}</h3>
                  {i === 0 && <span className="selo-lider">Sairia hoje</span>}
                </div>
                <div className="barra">
                  <div className="barra-preenchida" style={{ width: `${p.percentual}%` }} />
                </div>
                <p className="placar-numeros">
                  {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({p.votos}{' '}
                  {p.votos === 1 ? 'voto' : 'votos'})
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button type="button" className="botao botao-zerar" onClick={handleZerar}>
        Zerar votação
      </button>
    </main>
  );
}

export default Resultado;
