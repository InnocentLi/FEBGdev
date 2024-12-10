import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { petsAtom, addNewPet } from './api/petstore';

const AddPet: React.FC = () => {
  const [pets, setPets] = useAtom(petsAtom);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'available' | 'pending' | 'sold'>('available');

  const handleAddPet = async () => {
    const newPet = await addNewPet({ id: Math.random() * 10000, name, status });
    if (newPet) {
      setPets((prevPets) => [...prevPets, newPet]);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Pet Name" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value as 'available' | 'pending' | 'sold')}>
        <option value="available">Available</option>
        <option value="pending">Pending</option>
        <option value="sold">Sold</option>
      </select>
      <button onClick={handleAddPet}>Add Pet</button>
    </div>
  );
};

export default AddPet;
