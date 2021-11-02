import React from 'react';
import { BounceLoader, ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

// look at https://www.react-spinners.com/ for more types
// NOTE: IMPORTING THIS WILL ERROR
// https://github.com/davidhu2000/react-spinners/issues/430#issuecomment-873717462

const SpinnerType = ({ type, size, sizeUnit, colour }) => {
  switch (type) {
    case 'bounce':
      return <BounceLoader color={colour} sizeUnit={sizeUnit} size={size} />;
    case 'clip':
      return <ClipLoader color={colour} sizeUnit={sizeUnit} size={size} />;
    default:
      return <ClipLoader color={colour} sizeUnit={sizeUnit} size={size} />;
  }
};

SpinnerType.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  sizeUnit: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired
};

const Spinner = ({ type, size, sizeUnit, notCenter, colour, inline }) => (
  <div
    className={
      inline ? 'inline' : `flex ${notCenter ? null : 'justify-center'}`
    }>
    <SpinnerType type={type} size={size} sizeUnit={sizeUnit} colour={colour} />
  </div>
);

Spinner.propTypes = {
  inline: PropTypes.bool,
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  sizeUnit: PropTypes.string,
  notCenter: PropTypes.bool.isRequired,
  colour: PropTypes.string
};

Spinner.defaultProps = {
  inline: false,
  size: 35,
  sizeUnit: 'px',
  colour: '#123abc'
};

export default Spinner;
