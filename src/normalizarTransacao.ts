
declare global {
  interface Window {
    transacaoApi: TransacaoApi;
  }
}

type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
type TransacaoStatus = "Paga" | "Recusada pela operadora de cartão" | "Aguardando pagamento" | "Estornada";

export interface TransacaoApi {
  Nome: string;
  ID: number;
  Data: string;
  Status: TransacaoStatus;
  Email: string;
  ["Valor (R$)"]: string;
  ["Forma de Pagamento"]: TransacaoPagamento;
  ["Cliente Novo"]: number;
}

export interface TransacaoNormalizada {
  nome: string;
  id: number;
  data: string;
  status: TransacaoStatus;
  email: string;
  valor: number | null;
  moeda: "BRL" | "OUTRO" | null;
  pagamento: TransacaoPagamento;
  novo: boolean;
}

const parseValor = (valorStr: string): number | null => {
  if (!valorStr || !valorStr.includes("R$")) {
    return null;
  }

  const apenasNumero = valorStr
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");

  const numero = Number(apenasNumero);
  return Number.isNaN(numero) ? null : numero;
};

export default function normalizarTransacao(transacao: TransacaoApi): TransacaoNormalizada {
  const valor = parseValor(transacao["Valor (R$)"]);

  return {
    nome: transacao.Nome,
    id: transacao.ID,
    data: transacao.Data,
    status: transacao.Status,
    email: transacao.Email,
    valor,
    moeda: transacao["Valor (R$)"].includes("R$") ? "BRL" : "OUTRO",
    pagamento: transacao["Forma de Pagamento"],
    novo: transacao["Cliente Novo"] === 1,
  };
}



