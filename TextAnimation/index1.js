var number=1;

function addYESSIR(){
    const paragraph = document.createElement("p");
    const node = document.createTextNode("This is new node."+number);
    paragraph.appendChild(node);
    
    const element = document.getElementById("div1");
    element.appendChild(paragraph);
    number=number+1;


}

