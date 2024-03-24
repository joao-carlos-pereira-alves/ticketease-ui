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

    return { tickets: ticketsData, pagination: pagination, status: 200 } || null;
  } catch (error) {
    return error.response;
  }
}

/**
 * Função para atualizar um ticket.
 * @param {Object} params Parâmetros da requisição.
 * @param {string} params.id ID do ticket a ser atualizado.
 * @returns {Promise<Object|null|Error>} Ticket atualizado, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const putTicket = async (params) => {
  try {
    const { id } = params;

    const response     = await axios.put(`/tickets/${id}`, params);
    const responseData = response?.data || {};
    const ticketData   = responseData?.data || [];

    return { ticket: ticketData };
  } catch (error) {
    throw error;
  }
}