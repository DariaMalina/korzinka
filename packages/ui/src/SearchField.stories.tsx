import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchField } from './SearchField';

const meta = {
  title: 'Forms/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: 360 }}>
        <SearchField
          label="Поиск продуктов"
          onChange={(event) => setValue(event.target.value)}
          onClear={() => setValue('')}
          value={value}
        />
      </div>
    );
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
