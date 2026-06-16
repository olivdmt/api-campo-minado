class User {
  constructor({ id, nome, email, data_nascimento, senha, saldo, vitorias, derrotas, valor_ganho, valor_perdido, criado_em }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.data_nascimento = data_nascimento;
    this.senha = senha;
    this.saldo = saldo;
    this.vitorias = vitorias;
    this.derrotas = derrotas;
    this.valor_ganho = valor_ganho;
    this.valor_perdido = valor_perdido;
    this.criado_em = criado_em;
  }
}

export default User;
