const axios = require('axios')
const sha1 = require('sha1')
const FormData = require('form-data');
const fs = require('fs');

// função que recebe uma letra decifra e o numero de casas e retorna ela decifrada

let sirCalc = (word, charNum) => {
    let newIndex = 0
    let result = ''
    let alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    alpha.forEach((w, index)=>{
        if(w===word){
            result = alpha[index-charNum]
            if(result===undefined){
                newIndex = alpha.length-(Math.abs(index-charNum))
                result = alpha[newIndex]
            } else {
                result = alpha[index-charNum]
            }
        }
    })
    return result
}

// função que valida a mensagem recebida e faz os tratamentos iniciais

let sirDecipherer = (message, numChar) => {
    let input = message.split('')
    
    let isValid = /^[a-z]+$/
    let newMessage = []
    let log = ''
    input.forEach(element => {
        if(isValid.test(element)){
            newMessage.push(sirCalc(element, numChar))
        } else {
            newMessage.push(element)
        }
    });
    newMessage = newMessage.join('')
    console.log('Result: ', newMessage)
    return newMessage
}

// Requisição que chama a api
axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=69ebcc665d5918fd8492341920444b20374b7745')
    .then(response=>{
        // construção do novo objeto com a mensagem decifrada e o resumo critográfico
        message = response.data
        message.decifrado = sirDecipherer(message.cifrado, message.numero_casas)
        message.resumo_criptografico = sha1(message.decifrado)

        // criação do arquivo JSON
        var jsonContent = JSON.stringify(message);
        fs.writeFile("answer.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
            
            // Criação do form e stream do arquivo json
            let form_data = new FormData();
            form_data.append('answer',fs.createReadStream('./answer.json'));
            console.log(form_data)
            console.log("\n#\n#\n#\n#\n#\n#\n#\n#\n#\n#\n#\n#\n#\n#\n#\n#\n")

            // criação das configurações do header do post req
            const request_config = {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                data: form_data
              };
            
            // Requisição do post
            axios.post('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=69ebcc665d5918fd8492341920444b20374b7745', form_data, request_config)
            .then(response=>{
                console.log('@@@@@@@@@@@@@@@@@@@@@',response)
            })
            .catch(err=>{
                console.error(err)
            })
        });
        console.log(message)


    })
    .catch(err=>{
        console.error(err)
})