import { Cliente } from "../models/Cliente.js";
import { limparNumero } from "../utils/limparNumero.js";
import { validarCPF } from "../utils/validarCpf.js";
import clienteRepository from "../repositories/clienteRepositories.js";
import axios from "axios";

const clienteController = {
    criar: async (req, res) => {
        try {
            const { nome, cpf, telefones, cep, numero, complemento } = req.body;

            if (!nome || nome.trim() === '') {
                throw new Error('Digite seu nome');
            }

            if (!numero || numero.toString().trim() === '') {
                throw new Error('Digite o número da residência');
            }

            if (!telefones) {
                throw new Error('Digite seu telefone');
            }

            if (!cep) {
                throw new Error('Digite seu cep');
            }

            const cpfValido = validarCPF(cpf);
            const telefoneValido = limparNumero(telefones.toString());
            const cepValido = await consultarCep(cep);


            const cliente = {nome,cpf: cpfValido};

            const telefone = {numero: telefoneValido};

            const endereco = {cep: limparNumero(cepValido.cep) ?? null, logradouro: cepValido.logradouro ?? null, numero: numero.toString() ?? null, complemento, bairro: cepValido.bairro ?? null, cidade: cepValido.cidade ?? null, uf: cepValido.uf ?? null};

            const result = await clienteRepository.criar(cliente, telefone, endereco);
            res.status(201).json({id: result.insertId, message: "Cliente criado"});

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    editar: async (req, res) => {
        try {
            const id = req.params.id;

            const { nome, cpf} = req.body;

            const cliente = Cliente.alterar({nome, cpf,}, id);

            const result = await clienteRepository.editar(cliente);
            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message});
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;

            const result = await clienteRepository.deletar(id);

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message
            });
        }
    }
}

export default clienteController;

async function consultarCep(cep) {
    try {
        const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (respApi.data.erro) {
            throw new Error('Erro ao consultar o CEP');
        }

        return respApi.data;

    } catch (error) {
        console.error(error);
        throw new Error('Cep não encontrado');
    }
}