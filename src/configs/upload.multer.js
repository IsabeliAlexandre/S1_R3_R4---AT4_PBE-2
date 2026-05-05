import multer from "multer"; // manipular os arquivos que envia
import path from 'path'; // biblioteca que trabalha com os caminhos 
import crypto from 'crypto'; // gera as numerações  
import fs from 'fs'; // biblioteca que cria arquivos e etc
import { error } from "console";

const baseUploadDir = path.resolve(process.cwd(), 'uploads'); //pega o caminho absoluto, mais o caminho dentro da pasta 

const verificaDir = (dir)=>{ // verifica se o diretório existe, se não existe, aí sim pode criar
    if(!fs.existsSync(dir)){
         fs.mkdirSync(dir,{recursive: true})
    }
}

const createMulter = ({pasta, tiposPermitidos, tamanhoArquivo}) =>{
    const pastaFinal = path.join(baseUploadDir, pasta);
    verificaDir(pastaFinal);
    const storage=multer.diskStorage({
        destination:(req, file, cb) =>{ //cria um destino, que é a pasta final
            cb(null, pastaFinal);
        },
        filename: (req, file, cb) =>{
            const hash = crypto.randomBytes(12).toString('hex'); //gera um hash, coloca o ID gerado pelo banco de dados 
            cb(null, `${hash}-${file.originalname}`)
        }
        
    });

    const fileFilter = (req, file, cb) =>{
        if(!tiposPermitidos.includes(file.mimetype)){ //verifica o tipo de arquivo
            return cb(new Error("Tipo de arquvo não permitido"))
        }
        cb(null, true)

    }

    return multer({
        storage,
        limits: {tamanhoArquivo},
        fileFilter
    })

}

export default createMulter;