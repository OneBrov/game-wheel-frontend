import {  Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import wheel from '../../../assets/svg/wheel.svg';
import library from '../../../assets/svg/library.svg';
import history from '../../../assets/svg/history.svg';
import person from '../../../assets/svg/person.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../providers/AuthProvider';

type navButton = {
  icon: string,
  text: string,
  href: string
}

const TopNavButtons: navButton[] = [ 
  {
    'icon': wheel,
    'text': 'Колесо',
    'href': '/wheel'
  },
  {
    'icon': history,
    'text': 'История',
    'href': '/history'
  },
  {
    'icon': library,
    'text': 'Библиотека игр',
    'href': '/library'
  },
];

export const NavBar = () => {
  const { isAuth, username } = useAuthContext();

  const BottomNavButtons: navButton[] = [ 
    isAuth ? 
      {
        'icon': person,
        'text':`Вы ${username}. Выйти` ,
        'href': '/logout'
      } :
      {
        'icon': person,
        'text': 'Авторизация',
        'href': '/auth'
      },
  ];

  const [navWidth, setNavWidth] = React.useState<string>('80px');
  const navigate = useNavigate();



  const changeWidth = (width: string) => {
    setNavWidth(width);
  };

  const handleClickOnNav = (href: string) => {
    navigate(href);
  };

  return (
    <MuiDrawer
      onMouseEnter={() => changeWidth('300px')}
      onMouseLeave={() => changeWidth('80px')}
      variant="permanent"
      anchor="left"
      sx={{
        width: '80px',
        overflowX: 'hidden',
        flexShrink: 0,
        opacity: 0.8,
        zIndex: 3,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        '& .MuiDrawer-paper': {
          width: navWidth,
          overflowX: 'hidden',
          transition: 'width 0.2s',
        },
      }}
    >
      <List>
        {TopNavButtons.map(({ icon, text, href }) => (
          <ListItem 
            button 
            key={text} 
            onClick={()=>handleClickOnNav(href)}
          >
            <ListItemIcon>
              <img src={icon} alt="Wheel" />
            </ListItemIcon>
            <ListItemText 
              sx={{
                'marginLeft': '10px',
                'whiteSpace': 'nowrap'
              }} 
              primary={text} 
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      <List 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          height: '100%'
        }} 
      >
        {BottomNavButtons.map(({ icon, text, href }) => (
          <ListItem 
            button 
            key={text} 
            onClick={()=>handleClickOnNav(href)}
          >
            <ListItemIcon>
              <img src={icon} alt="Wheel" />
            </ListItemIcon>
            <ListItemText 
              sx={{
                'marginLeft': '10px',
                'whiteSpace': 'nowrap'
              }} 
              primary={text} 
            />
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

