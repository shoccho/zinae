// general purpose registers?
var registers = {}
var regelems = {}
var regnames = ["ax", "bx", "cx", "dx"] // "cs", "ip", "ss", "sp", "bp", "si", "di", "ds", "es"]

//flags
var CF, ZF, SF, OF, PF, AF, IF, DF
// pc
var pc;
var editor;
// opcode
var opcode;

const instructions = {
    "add":2,
    "sub":2,
    "mov":2,
    "inc":1,
    "dec":1,
    "int":1,
    "cmp":2
}
const convertToBin =(n)=>{
    n = "00000000".substr(n.length) + n;
    return n
}
const createElements = ()=>{
    var registerTable = document.getElementById("register-table-div")
    regnames.forEach(regName=>{
        var tr = document.createElement("tr")
        var td1 = document.createElement("td")
        var td2 = document.createElement("td")
    
        td1.innerHTML=regName.toUpperCase()

        
        td2.setAttribute("class","field")
        td2.setAttribute("id",regName)
        
        regelems[regName]=td2
        tr.appendChild(td1)
        tr.appendChild(td2)
        
        registerTable.appendChild(tr)
    })
}

const reset = () => {
    
    for (var i = 0; i < regnames.length; i++) {
        registers[regnames[i]] = 0;
        regelems[regnames[i]] = document.getElementById(regnames[i])
        
    }
    updateRegisterDisplay()
}
window.onload = () => {
    editor = document.getElementById("editor");
    // reset()
    createElements()
    reset()
}
const execute = (line) => {
    if (line.startsWith(';'))return
    opcode = line.substr(0,3)
    // console.log(opcode)
    if (Object.keys(instructions).includes(opcode)) {
        words = line.trim().slice(3).split(',')    
   
        if (words.length != instructions[opcode]) {
            //error
        } else {

            var first = words[0].trim()
            var second = words[1].trim()
            // console.log(first,second)
            if (regnames.includes(first)) {
                var second_val = parseSecondpart(second)
                if(line.startsWith("add"))add(first, second_val);
                else if(line.startsWith("sub"))sub(first, second_val);
                else if(line.startsWith("mov"))mov(first, second_val);
                updateRegisterDisplay();
            }

        }

    }
}

const parseSecondpart = (from) => {
    var fromv = 0
    console.log(from)
    if (regnames.includes(from)) {
        fromv = registers[from]
        
    } else {
        fromv = parseInt(from)
    }
    return fromv
}

const add = (to, val) => {
    registers[to] += val;
}

const sub = (to, val) => {
    registers[to] -= val;
}

const mov = (to, val) => {
    registers[to] = val;
}
const inc = (reg) => {
    registers[reg] += 1;
}

const dec = (reg) => {
    registers[reg] -= 1;
}

const updateRegisterDisplay = () => {
    regnames.forEach(reg => {
        regelems[reg].innerHTML = convertToBin(registers[reg])
    })

}

const emulate = () => {
    // console.log(editor.value)
    reset()
    var lines = editor.value.split("\n")
    for (line in lines) {
        line = lines[line].trim().toLowerCase()
        execute(line)

    }

}
