import { connection } from "../configs/Database.js"

const clienteRepository = {
    criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCli = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?)';
            const valuesCli = [cliente.nome ?? null, cliente.cpf ?? null];
            const [rowsCli] = await conn.execute(sqlCli, valuesCli);

            const sqlTel = 'INSERT INTO telefones (idCliente, telefone) VALUES (?,?)'
            const valuesTel = [rowsCli.insertId, telefone.numero ?? null];
            await conn.execute(sqlTel, valuesTel);

             const sqlEnd = 'INSERT INTO enderecos (idCliente, cep, logradouro, numero, complemento, bairro, cidade, UF) VALUES (?,?,?,?,?,?,?,?)'
            const valuesEnd = [rowsCli.insertId, endereco.cep ??  null , endereco.logradouro ?? null, endereco.numero ?? null, endereco.complemento ?? null, endereco.bairro ?? null, endereco.cidade ?? null, endereco.uf ?? null];
            await conn.execute(sqlEnd, valuesEnd);

            await conn.commit()
            return rowsCli
            
        } catch (error) {
            await conn.rollback()
            throw error; 
        }

        finally{
            conn.release();
        }
    },
    editar: async (telefone, endereco, cliente) => {

       const conn = await connection.getConnection()
        try {
            await conn.beginTransaction()
            const sqlTel = 'UPDATE telefones SET telefone=?, WHERE clienteId = ?';
            const valuesTel = [telefone.nome, telefone.clienteId];
            const [rowsTel] = await conn.execute(sqlTel, valuesTel);
        
            const sqlEnd = 'UPDATE enderecos SET cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, uf = ? WHERE clienteId = ?';
            const valuesEnd = [endereco.cep, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf. idCliente]
            const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd)

            await conn.commit()
            return {rowsTel, rowsEnd}
        
        } catch (error) {
            await conn.rollback()
            throw error
        } finally{
            conn.release()
        }
    },
    deletar: async (id) => {
        const sql = 'DELETE FROM clientes WHERE id = ?';
        const [rows] = await connection.execute(sql, [id]);
        return rows
    },
    selecionar: async () => {
        const sql = 'SELECT * FROM clientes';
        const [rows] = await connection.execute(sql);
        return rows
    },
};

export default clienteRepository;