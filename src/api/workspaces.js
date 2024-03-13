import { axios } from "../plugins/axios";

/**
 * Função para buscar o workspace do usuário atual
 * @returns {Object|null|Error} workspace do usuário, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const getWorkspace = async (workspace_id) => {
  try {
    const response = await axios.get("/workspaces/" + workspace_id);

    const responseData = response?.data || {};
    const workspaceData  = responseData?.data || [];

    return workspaceData || null;
  } catch (error) {
    return error;
  }
}