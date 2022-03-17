import { 
  Autocomplete, 
  Box, Checkbox, 
  FormControlLabel, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material';
import React from 'react';
import { useDebouncedEffect } from '../../hooks/useDebounceEffect';
import GamesService from '../../utils/api/services/GamesService';
import { RangeSlider } from '../RangeSlider';

interface GameSettingsProps {
  withGameName?: boolean,
  setQueryParams: (params: string) => void
}

interface GameOptions {
  developers: string[],
  publishers: string[],
  genres: string[],
  tags: string[],
}

export const GameSettings:React.FC<GameSettingsProps> = ({
  withGameName = false, setQueryParams
}) => { 
  const [ratingRange, setRatingRange] = React.useState<number[]>([0, 100]);
  const [metascoreRange, setMetascoreRange] = React.useState<number[]>([0, 100]);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 10000]);
  const [publishers, setPublishers] = React.useState<string[]>([]);
  const [developers, setDevelopers] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [genres, setGenres] = React.useState<string[]>([]);
  const [isFreeGame, setIsFreeGame] = React.useState<boolean>(false);

  const [options, setOptions] = React.useState<GameOptions>({
    developers: [], publishers: [], tags: [], genres: []
  });

  const [gameName, setGameName] = React.useState<string>('');

  React.useEffect(() => {
    const params = getQueryParams();
    console.log(params);
    setQueryParams(params);
  }, []);

  React.useEffect(() => {
    getAndSetOptions();
  }, []);
  
  const getAndSetOptions = async () => {
    const dbOptions = await Promise.all([
      GamesService.getDevelopers(),
      GamesService.getPublishers(),
      GamesService.getTags(),
      GamesService.getGenres(),
    ]);
    const developers = dbOptions[0].data.map(d => d.name).sort();
    const publishers = dbOptions[1].data.map(p => p.name).sort();
    const tags = dbOptions[2].data.map(t => t.name).sort();
    const genres = dbOptions[3].data.map(g => g.name).sort();

    const options: GameOptions = {
      developers,
      publishers,
      tags,
      genres,
    };

    setOptions(options);
  };

  useDebouncedEffect(() => {
    const params = getQueryParams();
    console.log(params);
    setQueryParams(params);
  }, [
    ratingRange, 
    metascoreRange, 
    priceRange, 
    publishers, 
    developers, 
    isFreeGame,
    tags,
    genres,
    gameName,
  ], 1000);

  console.log('SETTS RERENDER');
  

  const getQueryParams = React.useCallback(()=> {
    const params = new URLSearchParams({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      minMetascore: metascoreRange[0].toString(),
      maxMetascore: metascoreRange[1].toString(),
      minRating: ratingRange[0].toString(),
      maxRating: ratingRange[1].toString(),
      isFree: String(isFreeGame),
      name: gameName
    });
    publishers.forEach(p => params.append('publisher', p));
    developers.forEach(d => params.append('developer', d));
    tags.forEach(t => params.append('tag', t));
    genres.forEach(t => params.append('genre', t));
    return params.toString();
  }, [developers, gameName, genres, isFreeGame, metascoreRange, priceRange, publishers, ratingRange, tags]);
    
   

  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(e.target.value);
  };

  const handleChangeTags = (
    event: React.SyntheticEvent<Element, Event>, 
    value: string[]
  ) => {
    setTags(value);
  };

  const handleChangeGenres = (
    event: React.SyntheticEvent<Element, Event>, 
    value: string[]
  ) => {
    setGenres(value);
  };
  
  const handleChangePublishers = (
    event: React.SyntheticEvent<Element, Event>, 
    value: string[]
  ) => {
    setPublishers(value);
  };

  const handleChangeDevelopers = (
    event: React.SyntheticEvent<Element, Event>, 
    value: string[]
  ) => {
    setDevelopers(value);
  };

  const handleChangeIsFree = (
    event: React.ChangeEvent<HTMLInputElement>, 
    checked: boolean
  ) => {
    setIsFreeGame(checked);
  };

  return (
    <Box sx={{
      flex: '1 1 1px'
    }}>
      <Stack spacing={3}>
        <Box sx={{
          px: 3
        }}>
          <Typography>
            Цена
          </Typography>
          <RangeSlider 
            minDistance={100} 
            range={[0, 10000]} 
            onChange={setPriceRange} 
          />

          <FormControlLabel
            control={
              <Checkbox 
                checked={isFreeGame} 
                onChange={handleChangeIsFree} 
                name="isFree" 
              />
            }
            label="Искать бесплатные игры"
          />
     
        </Box>

        <Box sx={{
          px: 3
        }}>
          <Typography>
          Рейтинг игры
          </Typography>
          <RangeSlider 
            minDistance={10} 
            range={[0, 100]} 
            onChange={setRatingRange} 
          />
        </Box>
        <Box sx={{
          px: 3
        }}>
          <Typography>
          Metascore
          </Typography>
          <RangeSlider 
            minDistance={10} 
            range={[0, 100]} 
            onChange={setMetascoreRange} 
          />
        </Box>

        <Autocomplete
          multiple
          onChange={handleChangePublishers}
          limitTags={2}
          options={options.publishers}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Издатели"
              placeholder="Bethesda Softworks"
            />
          )}
        />

        <Autocomplete
          multiple
          limitTags={2}
          onChange={handleChangeDevelopers}
          options={options.developers}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Разработчики"
              placeholder="Obsidian Entertainment"
            />
          )}
        />

        <Autocomplete
          multiple
          limitTags={2}
          onChange={handleChangeGenres}
          options={options.genres}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Жанры"
              placeholder="Action"
            />
          )}
        />

        <Autocomplete
          multiple
          limitTags={2}
          onChange={handleChangeTags}
          options={options.tags}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Теги"
              placeholder="Coop"
            />
          )}
        />
        
        {withGameName && 
         <Box>
           <TextField
             label="Название игры"
             placeholder="Fallout: New Vegas"
             fullWidth
             value={gameName}
             onChange={handleNameChange}
           />
         </Box>
        }
      </Stack>
    </Box>
  );
};
