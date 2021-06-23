import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OneRoom = ({ meeting, photo, name, roomId, callBookForm }) => (
  <div className='col-md-3 col-sm-4 text-center'>
    <div className='room'>
      <Link className='header' style={{backgroundImage: `url('${photo}')`}} to={`/look/${roomId}`}>
        <span>{meeting}</span>
      </Link>
      <div className='info'>
        <p className='title'>{name}</p>
        <button
          className='btn btn-green btn-block'
          onClick={callBookForm}>
          BOOK
        </button>
      </div>
    </div>
  </div>
);

OneRoom.propTypes = {
  meeting: PropTypes.string,
  name: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  callBookForm: PropTypes.func
};

export default OneRoom;
