import { Slider } from '@mui/material';
import React from 'react';
import { useDebouncedEffect } from '../../hooks/useDebounceEffect';

interface RangeSliderProps {
    minDistance: number,
    range: number[],
    onChange: (range: number[])  => void,
}

function valuetext(value: number) {
  return `${value}`;
}

export const RangeSlider:React.FC<RangeSliderProps> = ({
  minDistance, onChange, range
}) => {
  const [value1, setValue1] = React.useState<number[]>(range);
  
  useDebouncedEffect(() => {
    onChange(value1);
  }, [value1, onChange], 100);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
  
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const marks = [
    {
      value: range[0],
      label: range[0]
    },
    {
      value: range[1],
      label: range[1]
    },
    {
      value: (range[1] - range[0]) / 2,
      label: (range[1] - range[0]) / 2
    },
  ];

  return (
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value1}
      min={range[0]}
      max={range[1]}
      marks={marks}
      step={(range[1] - range[0]) /100}
      onChange={handleChange1}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      disableSwap
    />
  );
};
