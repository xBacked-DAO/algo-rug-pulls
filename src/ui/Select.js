// https://github.com/react-hook-form/react-hook-form/issues/1620#issuecomment-628955225
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const SelectValue = ({ options, value, getOptionValue, ...rest }) => (
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

export default SelectValue;
