const axios = require('axios');
const os = require ('os');
const idNo = process.argv[2] || os.hostname(); 

function solicitarAcesso() {
  axios.post('http://coordenador:3000/solicitar-acesso', { id: idNo })
    .then(res => console.log(res.data.mensagem))
    .catch(err => console.error(err.message));
}

setInterval(solicitarAcesso, 5000); 
