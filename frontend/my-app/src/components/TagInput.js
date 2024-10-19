import React, { useState } from 'react';

const TagInput = ({setTags,tags}) => { // Default to an empty array
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault(); // Prevent form submission
      setTags((prevTags) => [...prevTags, input.trim()]);
      setInput(''); // Clear the input field
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter(tag => tag !== tagToDelete));
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', border: '1px solid #ccc', padding: '5px' }}>
        {tags.map((tag, index) => (
          <div key={index} style={{ margin: '2px', padding: '5px', background: '#007bff', color: 'white', borderRadius: '3px' }}>
            {tag}
            <button onClick={() => handleDelete(tag)} style={{ marginLeft: '5px', background: 'transparent', border: 'none', color: 'white' }}>x</button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag"
          style={{ border: 'none', outline: 'none', flexGrow: 1 }}
        />
      </div>
    </div>
  );
};

export default TagInput;
