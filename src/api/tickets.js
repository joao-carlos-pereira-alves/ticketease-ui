import { axios } from "../plugins/axios";

/**
 * Função para buscar os tickets do usuários atual
 * @returns {Object|null|Error} Tickets do usuário, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const getTickets = async (filter_params = null, pagination_params) => {
  try {
    const response = await axios.get("/tickets", {
      params: {
        ...filter_params && filter_params,
        ...pagination_params
      }
    });

    const responseData = response?.data || {};
    const ticketsData  = responseData?.data || [];
    const pagination   = responseData?.pagination || {}

    return { tickets: ticketsData, pagination: pagination } || null;
  } catch (error) {
    return error;
  }
}