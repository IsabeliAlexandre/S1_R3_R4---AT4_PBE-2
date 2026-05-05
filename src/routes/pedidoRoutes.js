import { Router } from "express";
import pedidoController from "../controller/pedidoController.js";
const pedidosRoutes = Router()

pedidosRoutes.post('/',pedidoController.criar);
pedidosRoutes.post('/:id/itens', pedidoController.criarNovoItem)
pedidosRoutes.get('/',pedidoController.selecionar);
pedidosRoutes.put('/:id',pedidoController.editarStatus);
pedidosRoutes.delete('/:id',pedidoController.deletarItem);

export default pedidosRoutes;