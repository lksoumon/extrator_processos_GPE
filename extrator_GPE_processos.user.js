// ==UserScript==
// @name         Extrator de Processos GPE
// @namespace    http://tampermonkey.net/
// @version      v0.1
// @description  try to take over the world!
// @author       You
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @match        http://sigeduca.seduc.mt.gov.br/grh/hwmgrhconsultaprocesso.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.br
// @grant        none
// ==/UserScript==


//CSS DOS BOTÕES
var styleSCT = document.createElement('style');
styleSCT.type = 'text/css';
styleSCT.innerHTML = 'span.button-like{display:inline-block;padding:10px 20px;background-color:#007bff;color:#fff;border:1px solid #007bff;border-radius:4px;cursor:pointer;text-align:center;text-decoration:none}span.button-like:hover{background-color:#0056b3;border-color:#0056b3}';
document.getElementsByTagName('head')[0].appendChild(styleSCT);
function downloadCSV(data, filename) {
  // Converter array de arrays para formato CSV
  const csvContent = "data:text/csv;charset=utf-8," +
                     data.map(row => row.join(",")).join("\n");

  // Criar um elemento de link para download
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = filename || "data.csv";

  // Simular um clique no link para iniciar o download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
    // Função para verificar se o elemento gx_ajax_notification está oculto
    function isNotificationHidden() {
        var notification = document.getElementById('gx_ajax_notification');
        if (notification) {
            var displayStyle = window.getComputedStyle(notification).getPropertyValue('display');
            return displayStyle === 'none';
        }
        return false; // Retorna falso se o elemento não existir
    }
    // Função de pausa com Promessa
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
function arrayToHtmlTable(dataArray) {
      // Abrir uma nova janela
      var novaJanela = window.open('', '_blank');

      // Criar o conteúdo HTML para a tabela
      var tabelaHTML = '<head><title>Erros de confirmação de presença</title></head><body><table id="tabelar" border="1"><thead><tr>';

      // Adicionar cabeçalho da tabela
      if (dataArray.length > 1) {
        dataArray[0].forEach(function (coluna) {
          tabelaHTML += '<th>' + coluna + '</th>';
        });
        tabelaHTML += '</tr></thead><tbody>';

        // Adicionar linhas da tabela
        for (var i = 1; i < dataArray.length; i++) {
          tabelaHTML += '<tr>';
          dataArray[i].forEach(function (valor) {
            tabelaHTML += '<td>' + valor + '</td>';
          });
          tabelaHTML += '</tr>';
        }

        tabelaHTML += '</tbody></table></body>';


        // Adicionar tabela ao conteúdo da nova janela
        novaJanela.document.write(tabelaHTML);
      } else {
        // Se a array estiver vazia, exibir uma mensagem na nova janela
        novaJanela.document.write('<p>Nenhum erro encontrado pelo script!</p>');
      }
    }
async function copiar (){
    var outout = [['ano','escola','processo','nome','cpf','matricula','funcao','vinc.','ini','fim','tipo','ação','situ']];

    let max = document.getElementById("vWPAG").length;

    for (var k = 1; k <= max; k++){
        //let temp = [];
        var tabelas = document.getElementById("Grid2ContainerTbl");

        var qtde = document.getElementById('Grid2ContainerTbl').getElementsByTagName('tr').length - 1;
        for (var j = 1; j <= qtde; j++){

            let nserv = ("0000" + j).slice(-4);
            outout.push([
                document.getElementById("span_vGGRHPRCANOLETCOD_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHPRCLOTCOD_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHPRCID_"+nserv).innerText.trim(),
                document.getElementById("span_vGGERPESNOM_"+nserv).innerText.trim(),
                document.getElementById("span_vGGERPESCPF_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHPRCSRVVNCMAT_"+nserv).innerText.trim(),
                document.getElementById("span_vGNUMFUNC_"+nserv).innerText.trim(),
                document.getElementById("span_vGNUMVINC_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHPRCDTAINI_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHPRCDTAFIN_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHTPOPRCDSC_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHPRCACAODSC_"+nserv).innerText.trim(),
                document.getElementById("span_vGGRHSITPRCDSC_"+nserv).innerText.trim(),

            ]);
        }

        console.log(k);
        if(k < max){
            (function (){
                document.getElementById("TPROXIMO").getElementsByTagName('a')[0].click();
            })();
        }else{arrayToHtmlTable(outout);downloadCSV(outout, "processos.csv");}
        await sleep(350);
        // Primeira pausa aguardando que o elemento gx_ajax_notification esteja oculto
            while (!isNotificationHidden()) {
                //console.log("Aguardando ocultar...");
                await sleep(1000); // Pausa por 1 segundo
            }
        await sleep(350);
    }


console.log(outout);




}

(function() {
    'use strict';
console.log('teste');
    var botao = document.createElement("span");
    botao.innerHTML = "Encaminhar para controle de movimentação";
    botao.className = "button-like";
    botao.onclick = () => {
        copiar ();
    }
    var tabela = document.getElementById("TABLEMENUBACKCOLOR_MPAGE");
    tabela.parentNode.insertBefore(botao, tabela.nextSibling);
})();
