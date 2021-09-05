// general purpose registers?
var registers ={} 
var regelems={}
var regnames =["ax","bx","cx","dx","cs","ip","ss","sp","bp","si","di","ds","es"]

//flags
var CF,ZF,SF,OF,PF,AF,IF,DF
// pc
var pc;
var editor;
// opcode
var opcode;
const reset =()=>{
    for(var i=0;i<regnames.length;i++){
        registers[regnames[i]]=0;
        regelems[regnames[i]]=document.getElementById(regnames[i])
    }
}
window.onload=()=>{
    editor = document.getElementById("editor");
    reset()

}

const emulate=()=>{
    // console.log(editor.value)
    reset()
    var lines = editor.value.split("\n")
    for (line in lines){
        line = lines[line].trim().toLowerCase()
        // console.log(line)
        if(line.startsWith("add ")){
            words = line.trim().slice(3).split(',')
            if(words.length<=1){
                //error
            }else{
                
                var to = words[0].trim()
                var from = words[1].trim()
            
                if(regnames.includes(to)){
                    var fromv=0
                    if(regnames.includes(from)){
                        fromv =  registers[from]
                    }else{
                        fromv = parseInt(from)
                    }
                    registers[to]+=fromv;
                    if(registers[to]>128){
                        //overflow
                        
                    }
                    regelems[to].innerHTML=registers[to].toString(2)
                }
                
            }

        }
        else if(line.startsWith("sub ")){
            words = line.trim().slice(3).split(',')
            if(words.length<=1){
                //error
            }else{
                
                var to = words[0].trim()
                var from = words[1].trim()
            
                if(regnames.includes(to)){
                    var fromv=0
                    if(regnames.includes(from)){
                        fromv =  registers[from]
                    }else{
                        fromv = parseInt(from)
                    }
                    registers[to]-=fromv;
                    if(registers[to]<-128){
                        //overflow
                        
                    }
                    regelems[to].innerHTML=registers[to].toString(2)
                }
                
            }

        }
    }


}
