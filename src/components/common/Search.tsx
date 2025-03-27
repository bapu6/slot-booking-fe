import React, { useState, useEffect, ChangeEvent } from 'react';
import { customFetch } from '../../utils/api';

export interface User {
    _id: string;
    name: string;
}

interface SearchSelectProps {
    onSelect: (name: User) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({ onSelect }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<User[]>([]);

    useEffect(() => {
        // Fetch users from API
        const fetchUsers = async () => {
            try {
                const response: { data: User[] } = await customFetch({ path: '/users' });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value.length >= 3) {
            setFilteredOptions(users.filter(option =>
                option.name.toLowerCase().includes(value.toLowerCase())
            ));
        } else {
            setFilteredOptions([]);
        }
    };

    const handleSelect = (option: User) => {
        onSelect(option);
        setSearchTerm('');
        setFilteredOptions([]);
    };

    return (
        <div>
        
            <input
            name="user"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search Employees..."
                className="w-full p-2 border border-gray-300 rounded"
            />
            {searchTerm.length >= 3 && (
                <div className="absolute  bg-green-300 border border-gray-300 rounded shadow-lg sm:w-2/6">
                    <ul className="list-disc pl-5">
                        {filteredOptions.map(option => (
                            <li key={option._id} onClick={() => handleSelect(option)} className="py-1 cursor-pointer">
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchSelect;
