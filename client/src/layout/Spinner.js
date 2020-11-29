import { Fragment } from 'react';

import './Spinner.css';

const Spinner = () => {
  return (
    <Fragment>
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </Fragment>
  )
}

export default Spinner;