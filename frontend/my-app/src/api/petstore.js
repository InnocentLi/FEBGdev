import axios from 'axios';

const API_BASE_URL = 'https://petstore3.swagger.io/api/v3';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 获取宠物信息 by 状态
 * @param {string} status - 宠物状态 (默认: 'available')
 * @returns {Promise<Array>} - 返回宠物信息数组
 */
export const getPetsByStatus = async (status = 'available') => {
  try {
    const response = await apiClient.get(`/pet/findByStatus`, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pets by status:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * 添加新宠物
 * @param {Object} petData - 宠物数据对象 { name: string, status: string }
 * @returns {Promise<Object>} - 返回添加的宠物信息
 */
export const addPet = async (petData) => {
  try {
    if (!petData || !petData.name || !petData.status) {
      throw new Error('Invalid pet data. Name and status are required.');
    }
    const response = await apiClient.post(`/pet`, petData);
    return response.data;
  } catch (error) {
    console.error('Error adding new pet:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * 根据 ID 获取宠物信息
 * @param {number} petId - 宠物 ID
 * @returns {Promise<Object>} - 返回宠物信息
 */
export const getPetById = async (petId) => {
  try {
    if (!petId) {
      throw new Error('Pet ID is required.');
    }
    const response = await apiClient.get(`/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pet by ID:', error.response?.data || error.message);
    throw error;
  }
};
