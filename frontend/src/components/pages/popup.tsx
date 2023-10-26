import Button from '../foundations/button'
import Header from '../foundations/header'
import Input from '../foundations/input'
import React, { ComponentProps, useEffect, useState } from 'react';
import Badge from'../foundations/badge'
import Block from'../foundations/block'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const PopupScreen: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Popup Content</h2>
            <p>This is a simple popup screen.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupScreen;