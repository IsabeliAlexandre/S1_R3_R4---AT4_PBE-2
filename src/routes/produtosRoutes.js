import { Router } from "express";
import produtoController from "../controller/produtoController.js";
import upload from "../middleware/upload.js";

const produtosRoutes = Router()
produtosRoutes.post('/', upload.single('caminhoImagem'),produtoController.criar);
produtosRoutes.put('/:id', produtoController.editar)
produtosRoutes.delete('/:id', produtoController.deletar)
produtosRoutes.get('/', produtoController.selecionar)

export default produtosRoutes;