import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
const Setting = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Setting</h1>
            </div>
            
        </div>
    );
};

export default Setting; 