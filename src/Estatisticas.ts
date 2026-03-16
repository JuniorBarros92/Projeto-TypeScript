type TransacaoValor = TransacaoNormalizada & { valor: number };

function filtrarValor(transacao: TransacaoNormalizada): transacao is TransacaoValor {
    return transacao.valor !== null;
}

export default class Estatisticas {
    private transacoes; 
    total;
    constructor(transacoes: TransacaoNormalizada[]) {
        this.transacoes = transacoes;
        
         this.total = this.setTotal();
    }
    private setTotal(){
        return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }
}
