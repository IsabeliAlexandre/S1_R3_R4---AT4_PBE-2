export class Endereco {
    #idCliente;
    #cep;

    constructor(pIdCliente, pCep) {
        this.#cep = pCep;
        this.#idCliente = pIdCliente

    }

    // GETTERS E SETTERS

    get IdCliente() {
        return this.#idCliente;
    }
    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get cep() {
        return this.#cep;
    }
    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    }


    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('Verifique o ID do cliente');
        }
    }

    #validarCep(value) {
    const cepRegex = /^[0-9]{8}$/;
    if (!cepRegex.test(value)) {
        throw new Error('CEP inválido');
    }
}

    static criar(dados) {
        return new Endereco(dados.idCliente, dados.cep);
    }

    static alterar(dados, id) {
        return new Endereco( idCliente, dados.cep);
    }
}