import React, { useRef, useEffect } from 'react';
import { Form, Input } from './Filter.styles';

interface FilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

function Filter({ value, onValueChange }: FilterProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onValueChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Escape') {
      onValueChange('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form role="search">
      <Input
        ref={inputRef}
        aria-label="Search bookmarks"
        placeholder="Type to search bookmarks..."
        value={value}
        onChange={handleInput}
      />
    </Form>
  );
}

export default Filter;
