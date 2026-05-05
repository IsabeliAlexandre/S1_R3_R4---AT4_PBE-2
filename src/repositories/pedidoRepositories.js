import { connection } from "../configs/Database.js"
const pedidoRepository = {

    criarNovoItem: async function (pedidoId, item) {
         const conn = await connection.getConnection();

    try {

        await conn.beginTransaction();

        const sqlItem = `INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?)`;
        const valuesItem = [pedidoId, item.produtoId, item.quantidade, item.valorItem];

        await conn.execute(sqlItem, valuesItem);

        //buscar itens do pedio
        const sqlBusca = `SELECT Id, Quantidade, ValorItem FROM itens_pedidos WHERE PedidoId = ?`;
        const [itens] = await conn.execute(sqlBusca, [pedidoId]);

        const subTotal = itens.reduce((total, item) => total +(item.Quantidade * item.ValorItem),0); //soma o total já existente com novo valor registrado dos itens, gerando um novo subtotal

        const sqlUpdate = `UPDATE pedidos SET SubTotal = ? WHERE Id = ?`;
        await conn.execute( sqlUpdate, [subTotal, pedidoId]);

        await conn.commit();
        return {message: 'Item adicionado com sucesso',subTotal};

    } catch (error) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
    },

    criar: async (pedido, itens) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        // INSERT Pedido
        const sqlPed = `INSERT INTO pedidos (ClienteId, SubTotal, Status) VALUES (?, ?, ?)`;

        const valuesPed = [ pedido.clienteId ?? null, pedido.subTotal ?? null,pedido.status ?? null];

        const [rowsPed] = await conn.execute(sqlPed, valuesPed);

        // INSERT Itens_Pedidos
        for (const item of itens) {

            const sqlItens = `INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?)`;

            const valuesItens = [rowsPed.insertId, item.produtoId ?? null, item.quantidade ?? null, item.valorItem ?? null];

            await conn.execute(sqlItens, valuesItens);
        }

        await conn.commit();

        return rowsPed;

    } catch (error) {

        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
    },

    editarStatus: async function (id, status) {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const sql = `UPDATE pedidos SET Status = ? WHERE Id = ?`;

        await conn.execute(sql, [status, id]);

        await conn.commit();

        return { message: "Status atualizado com sucesso" };

    } catch (error) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
    },

    deletarItem: async function (idItem) {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const [item] = await conn.execute(
            `SELECT PedidoId FROM itens_pedidos WHERE Id = ?`,[idItem]);

        const pedidoId = item[0].PedidoId;

        await conn.execute( `DELETE FROM itens_pedidos WHERE Id = ?`,[idItem]);

        const [itens] = await conn.execute( `SELECT Quantidade, ValorItem FROM itens_pedidos WHERE PedidoId = ?`,[pedidoId]);

        const subTotal = itens.reduce((total, item) => total + (item.Quantidade * item.ValorItem),0);

        await conn.execute( `UPDATE pedidos SET SubTotal = ? WHERE Id = ?`, [subTotal, pedidoId]);

        await conn.commit();

        return {message: "Item excluído com sucesso",subTotal};

    } catch (error) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
},

    selecionar: async () => {
        const sql = 'SELECT * FROM pedidos';
        const [rows] = await connection.execute(sql);
        return rows
    },
};

export default pedidoRepository;