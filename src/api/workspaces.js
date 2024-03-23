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

/**
 * Função para buscar os workspaces em que o usuário atual está incluído
 * @returns {Object|null|Error} workspace do usuário, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const getAllWorkspace = async (paginationParams) => {
  try {
    const response = await axios.get("/workspaces", { params: paginationParams });

    const responseData   = response?.data || {};
    const workspaceData  = responseData?.data || [];
    const pagination     = responseData?.pagination || {}

    return { workspaces: workspaceData, pagination: pagination } || null;
  } catch (error) {
    return error;
  }
}

/**
 * Função para criar um workspace
 * @returns {Object|null|Error} workspace, null se não encontrado, ou um erro se ocorrer um problema na requisição.
 */
export const createWorkspace = async (params) => {
  try {
    const response = await axios.post("/workspaces", params);

    const responseData = response?.data || {};
    const workspaceData  = responseData?.data || [];

    return workspaceData || null;
  } catch (error) {
    return error;
  }
}

