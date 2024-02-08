const axios = require('axios');
const os = require ('os');
const idNo = process.argv[2] || os.hostname(); 

function solicitarAcesso() {
  axios.post('http://coordenador:3000/solicitar-acesso', { id: idNo })
    .then(res => console.log(res.data.mensagem))
    .catch(err => console.error(err.message));
}

setInterval(solicitarAcesso, 5000); 

/*
app.post('/election', async (req, res) => {
    const { candidates } = req.body;
    console.log(Recebido pedido de eleição com candidatos: ${candidates});

    if (!candidates.includes(nodeId)) {
        candidates.push(nodeId); // Adiciona este nó à lista de candidatos
    }

    // Se a mensagem de eleição completou o anel
    if (candidates[0] == nodeId) {
        const newCoordinatorId = Math.max(...candidates); // Assume o nó com o maior ID como coordenador
        coordinatorPort = 3000 + newCoordinatorId; // Atualiza a porta do coordenador
        console.log(Nó ${newCoordinatorId} é o novo coordenador.);
        // Notifica todos os nós sobre o novo coordenador
        candidates.forEach(candidateId => {
            axios.post(http://localhost:${3000 + candidateId}/update-coordinator, { coordinatorId: newCoordinatorId })
                .then(() => console.log(Nó ${candidateId} notificado sobre o novo coordenador ${newCoordinatorId}))
                .catch(err => console.error(Erro ao notificar nó ${candidateId}, err));
        });
        res.send(Nó ${newCoordinatorId} eleito como novo coordenador.);
    } else {
        // Passa a mensagem de eleição para o próximo nó
        await axios.post(http://localhost:${nextNodePort}/election, { candidates });
        res.send(Mensagem de eleição passada para o nó na porta ${nextNodePort}.);
    }
});

app.post('/update-coordinator', (req, res) => {
    const { coordinatorId } = req.body;
    coordinatorPort = 3000 + coordinatorId; // Atualiza a porta do coordenador baseado no ID
    console.log(Coordenador atualizado para o nó ${coordinatorId});
    res.send(Coordenador atualizado para o nó ${coordinatorId}.);
});
*/