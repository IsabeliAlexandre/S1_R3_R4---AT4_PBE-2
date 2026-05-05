export class Telefone {
    #idCliente
    #telefone;

    constructor(pIdCliente, pTelefone) {
        this.#idCliente = pIdCliente;
        this.#telefone = pTelefone;
    }

    // GETTERS E SETTERS

    get idCliente() {
        return this.#idCliente;
    }
    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(value) {
        this.#validarTelefone(value);
        this.#telefone = value;
    }

    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('Verifique o ID do cliente');
        }
    }

    #validarTelefone(value) {
        if (value === undefined || value === null || value <= 0) {
            throw new Error('O valor deve ser maior que zero');
        }
    }

    static criar(dados) {
        return new Telefone(dados.idCliente, dados.telefone);
    }

    static alterar(dados, id) {
        return new Telefone(idCliente, dados.telefone, id);
    }
}