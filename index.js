const axios = require('axios')

axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=69ebcc665d5918fd8492341920444b20374b7745')
    .then(response=>{
        message = response.data
        
    })
    .catch(err=>{
        console.error(err)
})