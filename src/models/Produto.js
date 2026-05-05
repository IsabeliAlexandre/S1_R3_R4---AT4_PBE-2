export class Produto {
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImagem) {
        this.#idCategoria = pIdCategoria;
        this.#nome = pNome;
        this.#valor = pValor;
        this.#caminhoImagem = pCaminhoImagem;
    }

    // GETTERS E SETTERS

    get idCategoria() {
        return this.#idCategoria;
    }
    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImagem() {
        return this.#caminhoImagem;
    }
    set caminhoImagem(value) {
        this.#validarCaminhoImagem(value);
        this.#caminhoImagem = value;
    }

    #validarIdCategoria(value) {
        if (!value || value <= 0) {
            throw new Error('Verifique o ID da categoria');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O nome deve ter entre 3 e 45 caracteres');
        }
    }

    #validarValor(value) {
        if (value === undefined || value === null || value <= 0) {
            throw new Error('O valor deve ser maior que zero');
        }
    }

    #validarCaminhoImagem(value) {
        if (value || value.trim() === '') {
            throw new Error('Coloque o caminho da imagem');
        }
    }

    static criar(dados) {
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.caminhoImagem);
    }

    static alterar(dados, id) {
        return new Produto(idCategoria, dados.nome, dados.valor, id);
    }
}