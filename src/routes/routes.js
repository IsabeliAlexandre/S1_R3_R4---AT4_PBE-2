import { Router } from "express";
const routes = Router()
import categoriaRoutes from "./categoriaRoutes.js";
import produtosRoutes from "./produtosRoutes.js";
import clientesRoutes from "./clientesRoutes.js";
import pedidosRoutes from "./pedidoRoutes.js";

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtosRoutes);
routes.use('/clientes', clientesRoutes);
routes.use('/pedidos', pedidosRoutes);

export default routes;