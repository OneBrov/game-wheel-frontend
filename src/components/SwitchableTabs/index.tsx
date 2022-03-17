import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from 'react';
import { useTabContext } from '@material-ui/lab';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const context = useTabContext();
  const tabId = context?.value;
  return (
    <Box 
      height='100%'  
 
      flexDirection={'column'}
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        display: value === index ? 'flex' : 'none',
      }}
      {...other}
    >
      <Box height='100%'  display='flex' flexDirection={'column'}> 
        {children}
      </Box>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type tab = { name: string, content: React.ReactNode }

interface BasicTabsProps {
  tabs: tab[]
}

export const SwitchableTabs:React.FC<BasicTabsProps> = ({
  tabs
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box  sx={{ borderBottom: 1, borderColor: 'divider', flex: '1 1', display: 'flex'}}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs"
          sx={{
            flex: '1 1'
          }}
        >
          {tabs.map((tab, it) => 
            <Tab 
              key={tab.name} 
              label={tab.name} 
              {...a11yProps(it)} 
              sx={{
                flex: '1 1',
         
              }} 
            />
          )}
        </Tabs>
      </Box>
      <Box display='flex' flexDirection='column' flex='auto' minHeight='0' width='100%'>
        {tabs.map((tab, it) => 
          <TabPanel  key={tab.name} value={value} index={it}>
            {tab.content}
          </TabPanel>
        )}
      </Box>
    </Box>
  );
};
