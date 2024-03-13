import { axios } from "../plugins/axios";

/**
 * Função para buscar os workspace_users do usuário atual
 * @returns {Object|null|Error} workspace_users do usuário, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const getWorkspaceUsers = async () => {
  try {
    const response = await axios.get("/workspace_users");

    const responseData = response?.data || {};
    const workspaceUsersData  = responseData?.data || [];

    return workspaceUsersData || null;
  } catch (error) {
    return error;
  }
}
