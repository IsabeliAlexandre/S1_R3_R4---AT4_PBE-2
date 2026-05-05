export class Cliente {
    #id;
    #nome;
    #cpf;

    constructor(pId, pNome, pCpf) {
        this.#id = pId;
        this.#nome = pNome;
        this.#cpf = pCpf
    }

    // GETTERS E SETTERS

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }


    #validarId(value) {
        if (!value || value <= 0) {
            throw new Error('Verifique o ID da categoria');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O nome deve ter entre 3 e 45 caracteres');
        }
    }

    #validarCpf(value) {
        if (value === undefined || value === null || value <= 0) {
            throw new Error('O valor deve ser maior que zero');
        }
    }

    static criar(dados) {
        return new Cliente(dados.id, dados.nome, dados.cpf);
    }

    static alterar(dados, id) {
        return new Cliente(dados.nome, dados.cpf, id);
    }
}