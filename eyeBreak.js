var el = document.createElement("div");
el.setAttribute ("style","display: none;position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);");
document.body.appendChild(el);
var p = document.createElement("p");
p.innerHTML= "Time to Take an Eye Break.";
p.setAttribute ("style", "background-color: #fefefe;margin: auto;padding: 20px;border: 1px solid #888;width: 80%;");
el.appendChild(p);