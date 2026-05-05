export class ItensPedido {
    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    //CONSTRUCTOR
    constructor(pProdutoId, pQuantidade, pValorItem, pId, pPedidoId) {
        this.#produtoId = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
        this.#pedidoId = pPedidoId;

    }

    //GETTERS
    get id() {
        return this.#id;
    }
    get pedidoId() {
        return this.#pedidoId;
    }
    get produtoId() {
        return this.#produtoId;
    }
    get quantidade() {
        return this.#quantidade;
    }
    get valorItem() {
        return this.#valorItem;
    }

    //SETTERS
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }
    set pedidoId(value) {
        this.#validarpedidoId(value);
        this.#pedidoId = value;
    }
    set produtoId(value) {
        this.#validarprodutoId(value);
        this.#produtoId = value;
    }
    set quantidade(value) {
        this.#validarquantidade(value);
        this.#quantidade = value;
    }
    set valorItem(value) {
        this.#validarvalorItem(value);
        this.#valorItem = value;
    }
    //MÉTODOS AUXILIARES
    #validarId(value) {
        if (value || value <= 0) {
            throw new Error("Verifique o Id enviado");
        }
    }
    #validarpedidoId(value) {
        if (!value || value <= 0) {
            throw new Error("Verifique o Id do pedido");
        }
    }
    #validarprodutoId(value) {
        if (!value || value <= 0) {
            throw new Error("Verifique o Id do produto");
        }
    }
    #validarquantidade(value) {
        if (!value || value <= 0) {
            throw new Error("Não foi possível obter a quantidade");
        }
    }
    #validarvalorItem(value) {
        if (!value || value <= 0) {
            throw new Error("Não foi possível obter o subtotal");
        }
    }
    static calcularSubTotalItens(itens) {
        return (itens.reduce( // reduce: navega pela array armazenando o que existe ali
            (total, item) => total + (item.valorItem * item.quantidade), 0
        ));
    }


    //DESIGN PATTERN
    static criar(dados) {
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, null, null);
    }
    static editar(dados, id) {
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, id, dados.pedidoId);
    }
}