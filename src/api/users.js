import { axios } from "../plugins/axios";

/**
 * Função para buscar o usuário atual
 * @returns {Object|null|Error} O usuário atual, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get("/show_current_user");
    const userData = response.data?.data;

    return userData || null;
  } catch (error) {
    return error;
  }
}