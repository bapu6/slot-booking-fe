import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import _ from 'lodash';
import { customFetch } from '../../utils/api';

interface User {
    _id: string;
    name: string;
}

const Search: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const debouncedHandleChange = useMemo(() => _.debounce(handleChange, 300), []);

    const filteredNames = users
        .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((user) => user.name);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search names..."
                onChange={debouncedHandleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <ul className="list-disc pl-5">
                {filteredNames.map((name, index) => (
                    <li key={index} className="py-1">
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
