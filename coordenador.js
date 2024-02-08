const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

let filaDeAcesso = [];
let recursoDisponivel = true;
let noAtualComRecurso = null;
const caminhoDoArquivo = './recurso.txt';

app.post('/solicitar-acesso', (req, res) => {
  const idNo = req.body.id;
  if (idNo !== noAtualComRecurso) {
    console.log(`ID ${idNo} solicitou acesso`);
    filaDeAcesso.push(idNo);
    res.send({ mensagem: `Solicitação de acesso recebida do ID ${idNo}` });
  } else {
    res.send({ mensagem: `ID ${idNo} já possui o recurso e não pode solicitar novamente` });
  }
});

function liberarRecurso() {
  if (filaDeAcesso.length > 0 && recursoDisponivel) {
    noAtualComRecurso = filaDeAcesso.shift();
    console.log(`Recurso concedido ao ID ${noAtualComRecurso}`);
    recursoDisponivel = false;

    fs.appendFile(caminhoDoArquivo, `Último acesso: ID ${noAtualComRecurso}, Timestamp: ${new Date().toISOString()}\n`, (err) => {
      if (err) throw err;
      console.log('Informações do ID foram gravadas no arquivo.');
    });

    setTimeout(() => {
      console.log(`Recurso liberado pelo ID ${noAtualComRecurso}`);
      recursoDisponivel = true;
      noAtualComRecurso = null; 
    }, 10000); 
  }
}

setInterval(liberarRecurso, 1000); 

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
