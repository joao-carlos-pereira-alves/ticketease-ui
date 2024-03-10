import { axios } from "../plugins/axios";

/**
 * Função para buscar os tickets do usuários atual
 * @returns {Object|null|Error} Tickets do usuário, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const getTickets = async () => {
  try {
    const response = await axios.get("/tickets");
    const ticketsData = response.data?.data;

    return ticketsData || null;
  } catch (error) {
    return error;
  }
}