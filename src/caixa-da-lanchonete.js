class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: 'Café', valor: 3.0 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
      suco: { descricao: 'Suco Natural', valor: 6.2 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche extra', valor: 9.5 },
      combo2: { descricao: '1 Café e 1 Sanduíche extra', valor: 7.5 },
    }
    this.formasDePagamentoValidas = ['debito', 'credito', 'dinheiro']
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasDePagamentoValidas.includes(formaDePagamento)) {
      return 'Forma de pagamento inválida!'
    }

    if (!itens || itens.length === 0)
      return 'Não há itens no carrinho de compra!'

    const carrinho = itens.reduce(
      (acc, item) => {
        const [codigo, quantidade] = item.split(',')
        const menuItem = this.cardapio[codigo]

        if (!menuItem) {
          return { ...acc, error: 'Item inválido!' }
        }

        if (codigo === 'chantily' || codigo === 'queijo') {
          if (
            !itens.find((item) =>
              item.startsWith(
                `${codigo === 'chantily' ? 'cafe' : 'sanduiche'}`,
              ),
            )
          ) {
            return {
              ...acc,
              error: 'Item extra não pode ser pedido sem o principal',
              total: acc.total + 0,
            }
          }
        }

        return {
          ...acc,
          total: acc.total + menuItem.valor * parseInt(quantidade),
          [codigo]: (acc[codigo] || 0) + parseInt(quantidade),
        }
      },
      { total: 0 },
    )

    if (carrinho.error) {
      return carrinho.error
    }

    if (carrinho.total === 0) {
      return 'Quantidade inválida!'
    }

    if (formaDePagamento === 'dinheiro') {
      carrinho.total *= 0.95
    } else if (formaDePagamento === 'credito') {
      carrinho.total *= 1.03
    }

    return `R$ ${carrinho.total.toFixed(2).replace('.', ',')}`
  }
}

export { CaixaDaLanchonete }
