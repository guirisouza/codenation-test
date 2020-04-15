const axios = require('axios')

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
    console.log('Rresult: ', newMessage)
}

sirDecipherer('vkxlkizout (ot jkyomt) oy ginokbkj tuz cnkt znkxk oy tuznotm suxk zu gjj, haz xgznkx cnkt znkxk oy tuznotm suxk zu zgqk gcge. gtzuotk jk ygotz-kdavkxe', 6)
// console.log(sirCalc('a'))

// axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=69ebcc665d5918fd8492341920444b20374b7745')
//     .then(response=>{
//         message = response.data
        
//     })
//     .catch(err=>{
//         console.error(err)
// })