function format(x) {
    let fnl_str = ''

    //finding decimal
    let k = x.length-1
    for(let i=x.length-1;i>=0;i--) {
        if (x[i] == '.'){
            k = i - 1;
        }
    }
    for(let i = x.length-1; i>k;i--) fnl_str+=x[i];

    for(let i=k; i>=0; i--){
        if((k-i)%3 == 2 && i!=0){
            fnl_str += x[i]
            fnl_str += ','
        }else
            fnl_str += x[i]
    }
    fnl_str = fnl_str.split('').reverse().join('')
    return fnl_str
}




console.log("running")

let numbers = document.querySelectorAll('[btn-numbers]')
let prevDisplay = document.getElementsByClassName('prev')[0]
let currDisplay = document.getElementsByClassName('curr')[0]
let operators = document.querySelectorAll('[binary-operator]')
let eval = document.getElementsByClassName('result')[0]
let AC = document.querySelector('[clear]')
let u_operators = document.querySelectorAll('[unary-operator]')
let Ans = document.getElementById('Ans')
let backspace = document.getElementById('backspace')

let isEquals = false
let currentString = ''
let currentNumber = ''
let prevString = ''
let prevNumber = ''
let isDot = false

let operand1
let operand2
let operator

currDisplay.innerHTML = '0'
prevDisplay.innerHTML = ''


backspace.addEventListener('click', ()=>{
    currentNumber = currentNumber.substring(0, currentNumber.length-1)
    currDisplay.innerHTML = format(currentNumber)
})

numbers.forEach(btn => {
    btn.addEventListener('click', ()=> {
               
        let num = btn.innerHTML

        if (num === '.'){
            if(!isDot)
                isDot = true
            else return
        }
        

        //console.log(num)
        currentNumber = currentNumber + num.toString();
        //console.log(currentString)


        currentString = format(currentNumber)
        currDisplay.innerHTML = currentString.toString()
    })
})

operators.forEach(btn => {
    btn.addEventListener('click', () => {
        let op = btn.innerHTML
        if (operator != undefined){
            operator = op
            prevNumber = operand1 + ' ' + op.toString() + ' '
            prevDisplay.innerHTML = prevNumber
            isEquals = false;
            return
        }
        
        prevNumber = currentNumber + ' ' + op.toString() + ' '
        prevDisplay.innerHTML = prevNumber
        currDisplay.innerHTML = '0'
        operand1 = currentNumber
        operator = op
        currentNumber = ''
        isEquals = false;
    })
})

eval.addEventListener('click', ()=>{
    //console.log(currentNumber)
    //console.log(operand1)
    if (!isEquals) isEquals = true;
    else return
    if (operand1 != undefined && operator != undefined && currentNumber != ''){
        // console.log(78)
        operand2 = parseFloat(currentNumber)
        operand1 = parseFloat(operand1)
        prevDisplay.innerHTML = prevDisplay.innerHTML + ' ' + currentNumber + ' ='
        let res
        if(operator == '+'){
            res = operand1 + operand2
        }else if (operator == '-'){
            res = operand1 - operand2
        }else if (operator == '÷'){
            res = operand1 / operand2
        }else if (operator == 'x'){
            res = operand1 * operand2
        }else if (operator == '^'){
            res = Math.pow(operand1,operand2)
        }
        currDisplay.innerHTML = res   
        isDot = false
        currentNumber = res
    }
})


u_operators.forEach(btn => {
    btn.addEventListener('click', () => {
        
        if (currentNumber == ''){
            return            
        }

        let num = parseFloat(currentNumber)
        let op = btn.innerHTML
        let res
        if (op == 'sin'){
            res = Math.sin(num)
            prevDisplay.innerHTML = 'sin( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == 'cos'){
            res = Math.cos(num)
            prevDisplay.innerHTML = 'cos( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == 'ln'){
            res = Math.log(num)
            prevDisplay.innerHTML = 'ln( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == 'log'){
            res = Math.log10(num)
            prevDisplay.innerHTML = 'log( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == 'tan'){
            res = Math.tan(num)
            prevDisplay.innerHTML = 'tan( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == 'Inv'){
            res = 1/num
            prevDisplay.innerHTML = '( ' + currentString + ' )^-1'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == '√'){
            res = Math.sqrt(num)
            prevDisplay.innerHTML = '√( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == 'x!'){
            res = 1
            for (let i = 1;i<num;i++){
                res *= i
            }
            prevDisplay.innerHTML = '( ' + currentString + ' )!'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == '%'){
            res = num/100.0
            prevDisplay.innerHTML = '( ' + currentString + ' )%'
            currDisplay.innerHTML = res.toString()
        }
        else if (op == 'asin'){
            res = Math.asin(num)
            prevDisplay.innerHTML = 'asin( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }else if (op == 'atan'){
            res = Math.atan(num)
            prevDisplay.innerHTML = 'atan( ' + currentString + ' )'
            currDisplay.innerHTML = res.toString()
        }
        
        currentNumber = currDisplay.innerHTML
        
    })
})


AC.addEventListener('click', () => {
    currDisplay.innerHTML='0'
    prevDisplay.innerHTML=''
    currentNumber=''
    currentString=''
    prevString = ''
    prevNumber = ''
    operand1 = undefined
    operand2 = undefined
    operator = undefined
    isDot = false
    isEquals = false
})

Ans.addEventListener('click', () => {
    currDisplay.innerHTML = currentString
    prevDisplay.innerHTML = 'Ans'
})



let checkbox = document.getElementById('checkbox')
checkbox.addEventListener('change', ()=>{
    let body = document.getElementsByTagName("BODY")[0];
    let disp = document.getElementsByClassName('display')[0]
    let prev = document.getElementsByClassName('prev')[0]
    let curr = document.getElementsByClassName('curr')[0]
    
    if (checkbox.checked){
        body.style.backgroundColor = "#FFFFFF"
        disp.style.backgroundColor = "#FFFFFF"
        prev.style.color = "#000"
        curr.style.color = "#000"
    }else{
        body.style.backgroundColor = "#32322F"
        disp.style.backgroundColor = "#32322F"
        prev.style.color = "#888"
        curr.style.color = "#FFF"
    }
})
