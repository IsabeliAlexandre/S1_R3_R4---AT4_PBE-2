import { statusPedidos } from "../enums/statusPedido.js";
import { ItensPedido } from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepositories.js";

const pedidoController = {
    
    criarNovoItem: async (req, res) => { 
        try {
            
        const pedidoId = req.params.id;
        const {produtoId, quantidade, valorItem} = req.body;
        const item = ItensPedido.criar({produtoId, quantidade, valorItem});

        const result =
            await pedidoRepository.criarNovoItem(pedidoId, item);

        return res.status(201).json(result);

        } catch (error) {
            console.error(error);
        return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
        }
    },

    criar: async (req, res) => {
    try {

        let { clienteId, itens } = req.body;

        const itensPedido = itens.map(item =>ItensPedido.criar({produtoId: item.produtoId, quantidade: item.quantidade, valorItem: item.valorItem})
        );

        const subTotal =
            ItensPedido.calcularSubTotalItens(itensPedido);

        const pedido = Pedido.criar({clienteId,subTotal,status: statusPedidos.ABERTO
        });

        const result =
            await pedidoRepository.criar(pedido, itensPedido);

        res.status(201).json({ result });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: 'Ocorreu um erro no servidor',
            errorMessage: error.message
        });
    }
    },

    editarStatus: async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const resultado = await pedidoRepository.editarStatus(id, status);

        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    },

    selecionar: async (req, res) => {
        try {
            const result = await pedidoRepository.selecionar();
            return res.status(200).json(result);

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Erro ao listar", error: message});
        }
    },

    deletarItem: async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pedidoRepository.deletarItem(id);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
    }
    }
};

export default pedidoController;
