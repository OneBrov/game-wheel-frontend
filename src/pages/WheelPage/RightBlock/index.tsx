import { Box } from '@mui/material';
import React from 'react';
import { DarkBackground } from '../../../components/DarkBackground';
import { SwitchableTabs } from '../../../components/SwitchableTabs';
import { GameTab } from './GameTab';
import { SettingsTab } from './SettingsTab';

export const RightBlock = () => {
  return (
    <DarkBackground>
      <Box sx={{
        width: '500px',
      }}>
        <SwitchableTabs 
          tabs={[
            {
              name: 'Игра',
              content: <GameTab />
            },
            {
              name: 'Настройки',
              content: <SettingsTab />
            }
          ]}
        />
      </Box>
    </DarkBackground>
  );
};
