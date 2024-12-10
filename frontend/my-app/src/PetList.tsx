import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { petsAtom, fetchPetsByStatus } from './api/petstore';

const PetList: React.FC = () => {
  const [pets, setPets] = useAtom(petsAtom);

  useEffect(() => {
    const loadPets = async () => {
      const availablePets = await fetchPetsByStatus('available');
      setPets(availablePets);
    };

    loadPets();
  }, [setPets]);

  return (
    <ul>
      {pets.map((pet) => (
        <li key={pet.id}>
          {pet.name} - {pet.status}
        </li>
      ))}
    </ul>
  );
};

export default PetList;
