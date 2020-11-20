export default `classe Animal {
  construtor (nome) {
    isto.nome = nome;
  }

  fale () {
    console.log(isto.nome);
  }
}

classe Gato estende Animal {
  fale () {
    super.fale();
    console.log("miau");
  }
}

var bichano = novo Gato("bichano");
bichano.fale();
`
