// https://github.com/react-hook-form/react-hook-form/issues/1620#issuecomment-628955225
import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

export const SelectValue = ({ options, value, getOptionValue, ...rest }) => (
  <Select
    options={options}
    getOptionValue={getOptionValue}
    {...rest}
    value={options.find(
      (option) =>
        (getOptionValue ? getOptionValue(option) : option.value) === value
    )}
  />
);

SelectValue.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  getOptionValue: PropTypes.func.isRequired
};

export const AsyncSelectValue = ({
  value,
  getOptionValue,
  onChange,
  loadOptions,
  ...rest
}) => (
  <AsyncSelect
    cachedOtions
    defaultOptions
    getOptionValue={getOptionValue}
    loadOptions={loadOptions}
    onChange={onChange}
    {...rest}
    // value={options.find(
    //   (option) =>
    //     (getOptionValue ? getOptionValue(option) : option.value) === value
    // )}
  />
);

AsyncSelectValue.propTypes = {
  value: PropTypes.object.isRequired,
  getOptionValue: PropTypes.func.isRequired
};
