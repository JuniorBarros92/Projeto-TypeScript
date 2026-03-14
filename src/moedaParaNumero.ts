/**
 * 
 * @param moeda 
 * @returns 
 */

export default function moedaParaNumero(moeda: string): number | null {
    console.log("moedaParaNumero chamada com:", moeda);
    const numero = Number(moeda.replaceAll(".", "").replace(",", ".").replace("R$", ""));
    return Number.isNaN(numero) ? null : numero;
  } 