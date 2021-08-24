
        const format = Intl.NumberFormat('pt-BR',{
            style:'currency',currency:'BRL'
        })
        const formatKilo = Intl.NumberFormat('pt-BR',{
            style:'unit', unit:'kilogram'
        });    
        function mudaCor(obj,cor){
            obj.style.backgroundColor = cor;
        }        
        function limpaEscolha(){      
            for(let i = 0; i < 4; i++){
                document.forms[0].elements[i].value="";
            }                 
        }
        function limpaPag(){
            document.forms[0].elements[5].value=""; 
        }
        function gerarNota(tCarne1P,qtdCarne1P,precoCarne1P,totPreco1P,tCarne2P,qtdCarne2P,precoCarne2P,
                            totPreco2P,opcaoPagP,totParcP,descP,totP){                                            
            result1.innerHTML=`                
                    <ul>
                        <li>Nota Fiscal</li><br>
                        <li>Tipo de Carne 1: ${tCarne1P}</li>
                        <li>${formatKilo.format(qtdCarne1P)} x ${format.format(precoCarne1P)} = ${format.format(totPreco1P)}</li>                                                
                        <li>Tipo de Carne 2: ${tCarne2P}</li>
                        <li>${formatKilo.format(qtdCarne2P)} x ${format.format(precoCarne2P)} = ${format.format(totPreco2P)}</li>                                                
                        <li>Forma de Pagamento: ${opcaoPagP}</li>
                        <li>Total:${format.format(totParcP)}</li>
                        <li>Desconto:${format.format(descP)}</li><br>
                        <li class='tabela'>Total a pagar: ${format.format(totP)}</li>                        
                    </ul>
                    <a href='index.html'>Voltar</a>                    
                    `                                                    
        }

        function recebe(event){
            event.preventDefault();

            let tCarne1 = document.querySelector('#carne1').value;
            let qtdCarne1 = parseFloat(qtd1.value);
            let tCarne2 = carne2.value;
            let qtdCarne2 = parseFloat(qtd2.value);
            let opcaoPag = pag.value;        
            let precoCarne1,precoCarne2,totParc,tot,totPreco1,totPreco2,desc; 
            let msg ="Por favor, informe um valor válido !";
            const percDesc = 5;                
            const fileDuplo = "Filé Duplo";
            const alcatra = "Alcatra";
            const picanha = "Picanha"; 
            valida = true;         

            if(tCarne1 === "" || tCarne2 === "" || qtdCarne1 <= 0 || qtdCarne2 <= 0 || isNaN(qtdCarne1) || isNaN(qtdCarne2) || opcaoPag === ""){
                valida = false;                     
                result1.innerHTML= `${msg}<a href='index.html'>Voltar</a>`;                    
            }else{
                valida;
                if(tCarne1 == fileDuplo && tCarne2 == fileDuplo){
                    qtdCarne1 >= 5 ? (precoCarne1 = 4.90) : (precoCarne1 = 5.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 4.90) : (precoCarne2 = 5.80);                   
                }else if(tCarne1 == fileDuplo && tCarne2 == alcatra){                    
                    qtdCarne1 >= 5 ? (precoCarne1 = 4.90) : (precoCarne1 = 5.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 5.90) : (precoCarne2 = 6.80);   
                }else if(tCarne1 == fileDuplo && tCarne2 == picanha){
                    qtdCarne1 >= 5 ? (precoCarne1 = 4.90) : (precoCarne1 = 5.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 6.90) : (precoCarne2 = 7.80);
                }else if(tCarne1 == alcatra && tCarne2 == alcatra){
                    qtdCarne1 >= 5 ? (precoCarne1 = 5.90) : (precoCarne1 = 6.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 5.90) : (precoCarne2 = 6.80);                        
                }else if(tCarne1 == alcatra && tCarne2 == fileDuplo){
                    qtdCarne1 >= 5 ? (precoCarne1 = 5.90) : (precoCarne1 = 6.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 4.90) : (precoCarne2 = 5.80);
                }else if(tCarne1 == alcatra && tCarne2 == picanha){
                    qtdCarne1 >= 5 ? (precoCarne1 = 5.90) : (precoCarne1 = 6.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 6.90) : (precoCarne2 = 7.80);
                }else if(tCarne1 == picanha && tCarne2 == picanha){
                    qtdCarne1 >= 5 ? (precoCarne1 = 6.90) : (precoCarne1 = 7.80); 
                    qtdCarne2 >= 5 ? (precoCarne2 = 6.90) : (precoCarne2 = 7.80);                   
                }else if(tCarne1 == picanha && tCarne2 == fileDuplo){
                    qtdCarne1 >= 5 ? (precoCarne1 = 6.90) : (precoCarne1 = 7.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 4.90) : (precoCarne2 = 5.80);
                }else{
                    qtdCarne1 >= 5 ? (precoCarne1 = 6.90) : (precoCarne1 = 7.80);
                    qtdCarne2 >= 5 ? (precoCarne2 = 5.90) : (precoCarne2 = 6.80);
                }

                if (valida){
                    totPreco1 = qtdCarne1 * precoCarne1;
                    totPreco2 = qtdCarne2 * precoCarne2;
                    totParc = totPreco1 + totPreco2;

                    if (opcaoPag != "Dinheiro"){                       
                        desc = (totParc / 100) * percDesc;
                        tot = totParc - desc;                        
                    }else{                        
                        desc = (totParc / 100) * 0;
                        tot = totParc - desc;                        
                    }
                    
                    gerarNota   (tCarne1,qtdCarne1,precoCarne1,totPreco1,tCarne2,qtdCarne2,precoCarne2,
                               totPreco2,opcaoPag,totParc,desc,tot);                     
                }                                                                     
            }                    
        }         
        form.addEventListener('submit',recebe);     
   
