import userInterface from "../../interfaces/userInterface.js";

class UserRegister {
  register(user: userInterface): void {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.nome || user.nome.length < 3) {
      throw new Error("Por favor, digite um nome válido.");
    }

    if (!user.email || !emailRegex.test(user.email)) {
      throw new Error("Por favor, digite um email válido.");
    }

    
  }
}

export default UserRegister;
