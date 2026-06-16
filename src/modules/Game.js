class Game {
  constructor({ id, id_usuario, valor_aposta, premio_atual, status, tabuleiro, posicoes_reveladas, diamantes_encontrados, criado_em }) {
    this.id = id;
    this.id_usuario = id_usuario;
    this.valor_aposta = valor_aposta;
    this.premio_atual = premio_atual;
    this.status = status;
    this.tabuleiro = tabuleiro;
    this.posicoes_reveladas = posicoes_reveladas;
    this.diamantes_encontrados = diamantes_encontrados;
    this.criado_em = criado_em;
  }
}

export default Game;
