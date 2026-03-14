import fetchData from "./fetchData";
import type { TransacaoApi } from "./normalizarTransacao";
import normalizarTransacao from "./normalizarTransacao";


async function handleData() {
  const data = await fetchData<TransacaoApi[]>("https://api.origamid.dev/json/transacoes.json?_=" + Date.now());

  if (!data) return;

  const transacoesNormalizadas = data.map(normalizarTransacao);
  console.log(transacoesNormalizadas);
}

handleData();