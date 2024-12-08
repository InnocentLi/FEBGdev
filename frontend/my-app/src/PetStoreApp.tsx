import React, { useEffect, useState } from 'react';
import { getPetsByStatus, addPet } from './api/petstore';

// 宠物类型
interface Pet {
    id: number;
    name: string;
    status: string;
  }
  
  const PetStoreApp: React.FC = () => {
    // 类型推断
    const [pets, setPets] = useState<Pet[]>([]);
    const [newPet, setNewPet] = useState<Partial<Pet>>({ name: '', status: 'available' });
  
    // 获取可用状态的宠物
    useEffect(() => {
      const fetchPets = async () => {
        try {
          const petsData: Pet[] = await getPetsByStatus('available'); // 明确类型
          setPets(petsData);
        } catch (error) {
          console.error('Failed to fetch pets:', error);
        }
      };
  
      fetchPets();
    }, []);
  
    // 添加新宠物
    // 添加新宠物
  const handleAddPet = async () => {
    try {
      // 校验 newPet 的必要字段
      if (!newPet.name || !newPet.status) {
        throw new Error('Name and status are required to add a pet.');
      }

      // 构造符合 API 要求的数据
      const petData: Pet = {
        id: Math.floor(Math.random() * 10000), // 生成临时唯一 ID
        name: newPet.name,
        status: newPet.status,
      };

      const addedPet: any = await addPet(petData);

      // 明确类型为 Pet[]，避免类型不匹配
      setPets((prevPets: Pet[]) => [...prevPets, addedPet]);
      setNewPet({ name: '', status: 'available' });
    } catch (error) {
      console.error('Failed to add pet:', error);
    }
  };


  return (
    <div>
      <h1>Pet Store</h1>
      <div>
        <h2>Add New Pet</h2>
        <input
          type="text"
          placeholder="Pet Name"
          value={newPet.name || ''}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
        />
        <select
          value={newPet.status || 'available'}
          onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}
        >
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
        <button onClick={handleAddPet}>Add Pet</button>
      </div>

      <h2>Available Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} - {pet.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetStoreApp;
