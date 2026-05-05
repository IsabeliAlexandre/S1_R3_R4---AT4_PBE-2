import { Categoria } from "../models/Categoria.js";
import categoriasRepository from "../repositories/categoriasRepositories.js";

const categoriaController = {
    criar: async (req, res) => {
        try {
            const {nome, descricao} = req.body
            const categoria = Categoria.criar({nome, descricao}); // chamo a função do meu método
            const result =  await categoriasRepository.criar(categoria);

            res.status(201).json({result})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const {nome, descricao} = req.body
            const categoria = Categoria.alterar({nome, descricao}, id); 
            const result =  await categoriasRepository.editar(categoria);

            res.status(200).json({result});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id; 
            const result =  await categoriasRepository.deletar(id);

            res.status(200).json({result});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },
    selecionar: async (req, res) => {
        try {
            const result =  await categoriasRepository.selecionar();
            res.status(200).json({result});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },
    
}

export default categoriaController