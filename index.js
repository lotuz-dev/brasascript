import ace from "brace";

import * as Babel from "@babel/standalone";
import transformer from "babel-plugin-transform-brasa";
import debounce from "debounce"

import "brace/mode/javascript";
import "brace/theme/textmate";

import classeExemplo from "./exemplos/classe";
import condicionalExemplo from "./exemplos/condicional";
import escolhaExemplo from "./exemplos/escolha";
import somaExemplo from "./exemplos/soma";

import '@fortawesome/fontawesome-free/css/all.css'

const EXEMPLOS = [somaExemplo, condicionalExemplo, escolhaExemplo, classeExemplo];

Babel.registerPlugin("transform-brasa", transformer);

window.onload = () => {
  const $editorBrs = document.querySelector("#editor-brs");
  const $editorJs = document.querySelector("#editor-js");

  let editorBrs = ace.edit("editor-brs");
  editorBrs.setTheme("ace/theme/textmate");
  editorBrs.session.setMode("ace/mode/javascript");
  editorBrs.setFontSize("18px");
  editorBrs.getSession().setUseWorker(false);

  let editorJs = ace.edit("editor-js");
  editorJs.setTheme("ace/theme/textmate");
  editorJs.session.setMode("ace/mode/javascript");
  editorJs.setFontSize("18px");
  editorJs.renderer.setShowGutter(false);
  editorJs.getSession().setUseWorker(false);
  editorJs.setReadOnly(true);

  editorBrs.getSession().setValue(somaExemplo);
  changeCode();
  editorBrs.getSession().on("change", debounce(changeCode, 1000));

  function changeCode() {
    let text = editorBrs.getSession().getValue();

    try {
    let js = Babel.transform(text, { plugins: ['transform-brasa'] }).code;

      editorJs.getSession().setValue(js);
    } catch(e) {}
  }

  const $exemplos = document.getElementById("exemplos");

  $exemplos.onclick = (e) => {
    let i = Array.prototype.indexOf.call(e.target.parentElement.children, e.target);
    editorBrs.getSession().setValue(EXEMPLOS[i]);
    changeCode();
  }
};

