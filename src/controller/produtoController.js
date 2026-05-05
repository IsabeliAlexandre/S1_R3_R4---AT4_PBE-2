import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtosRepositories.js";

const produtoController = {
    criar: async (req, res) => {
        try {

            if(!req.file){
                return res.status(400).json({message:'Imagem não foi enviada'})
            }

            const {idCategoria, nome, valor} = req.body
            const caminhoImagem = req.file.filename
            const produto = Produto.criar({idCategoria, nome, valor, caminhoImagem}); // chamo a função do meu método
            const result =  await produtoRepository.criar(produto);

            res.status(201).json({result})

            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const {idCategoria, nome, valor} = req.body
            const produto = Produto.alterar({idCategoria, nome, valor}, id); 
            const result =  await produtoRepository.editar(produto);

            res.status(200).json({result});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id; 
            const result =  await produtoRepository.deletar(id);

            res.status(200).json({result});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },
    selecionar: async (req, res) => {
        try {
            const result =  await produtoRepository.selecionar();
            res.status(200).json({result});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.messege});

        }
    },
    
}

export default produtoController;