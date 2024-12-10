import axios from 'axios';
import { atom } from 'jotai';
import { z } from 'zod';

// 定义 Pet 类型
export const PetSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(['available', 'pending', 'sold']),
});

export type Pet = z.infer<typeof PetSchema>; // 自动推断 Pet 类型

// API 基础配置
const API_BASE_URL = 'https://petstore3.swagger.io/api/v3';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 定义 Atoms
export const petsAtom = atom<Pet[]>([]); // 全局宠物列表
export const selectedPetAtom = atom<Pet | null>(null); // 当前选中宠物

// 公共的错误日志函数
const logError = (action: string, error: unknown) => {
  console.error(`Error during ${action}:`, error);
};

/**
 * 获取宠物信息 by 状态
 * @param status - 宠物状态
 */
export const fetchPetsByStatus = async (status: string): Promise<Pet[]> => {
  try {
    const response = await apiClient.get(`/pet/findByStatus`, { params: { status } });
    return z.array(PetSchema).parse(response.data); // 验证返回的数据结构
  } catch (error) {
    logError('fetchPetsByStatus', error);
    return []; // 返回空数组以确保调用方正常运行
  }
};

/**
 * 添加新宠物
 * @param petData - 待添加的宠物数据
 */
export const addNewPet = async (petData: Pet): Promise<Pet | null> => {
  try {
    const response = await apiClient.post(`/pet`, petData);
    return PetSchema.parse(response.data); // 验证新宠物数据
  } catch (error) {
    logError('addNewPet', error);
    return null; // 返回 null 以表示失败
  }
};

/**
 * 根据 ID 获取宠物信息
 * @param petId - 宠物 ID
 */
export const fetchPetById = async (petId: number): Promise<Pet | null> => {
  try {
    const response = await apiClient.get(`/pet/${petId}`);
    return PetSchema.parse(response.data); // 验证返回的数据结构
  } catch (error) {
    logError('fetchPetById', error);
    return null; // 返回 null 以表示未找到或请求失败
  }
};
