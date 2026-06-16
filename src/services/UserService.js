import userRepository from '../respositories/UserRepository.js';

class UserService {
  async register(userData) {
    const { nome, email, dataNascimento, senha, confirmacaoSenha } = userData;

    if (!nome || !email || !dataNascimento || !senha || !confirmacaoSenha) {
      throw new Error('All fields are required!');
    }

    if (senha !== confirmacaoSenha) {
      throw new Error('The password do not match');
    }

    this.validatePassword(senha);

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('E-mail already registered');
    }

    return await userRepository.create({ nome, email, dataNascimento, senha });
  }

  async login(email, senha) {
    const user = await userRepository.findByEmail(email);
    if (!user || user.senha !== senha) {
      throw new Error('invalid E-mail or password');
    }
    return {
      nome: user.nome,
      email: user.email,
      dataNascimento: user.data_nascimento
    };
  }

  async resetPassword(id, novaSenha) {
    this.validatePassword(novaSenha);

    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Need to get full user to compare password
    const fullUser = await userRepository.findByEmail(user.email);
    if (fullUser.senha === novaSenha) {
      throw new Error("The new password can't be the same as the current password");
    }

    await userRepository.updatePassword(id, novaSenha);
  }

  async getUserProfile(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User do not found');
    }
    return user;
  }

  async getDashboard(id) {
    return await userRepository.getDashboardStats(id);
  }

  async updateSaldo(id, saldo) {
    if (saldo < 0) {
      throw new Error("It's not allowed to register a negative balance");
    }
    const roundedSaldo = Math.round(saldo * 100) / 100;
    return await userRepository.updateSaldo(id, roundedSaldo);
  }

  async deleteUser(id) {
    await userRepository.delete(id);
  }

  validatePassword(senha) {
    if (senha.length < 8) {
      throw new Error("The password must have at least 8 characters");
    }
    if (!/[A-Z]/.test(senha)) {
      throw new Error("The password must have at least a capital letter");
    }
    if (!/[0-9]/.test(senha)) {
      throw new Error('The password must have at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      throw new Error('The password must have at least a special character');
    }
  }
}

export default new UserService();
