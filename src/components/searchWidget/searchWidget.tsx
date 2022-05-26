import React from 'react';
import { TSearchWidget } from './@types';
import './searchWidget.scss';

export default function SearchWidget(props: TSearchWidget) {
  const { value, onChange = () => null, clearSearch = () => null } = props;
  return (
    <div className="searchWidgetWrap">
      <input value={value || ''} onChange={onChange} />
      <img
        width={26}
        height={26}
        src={require('../../images/close.png')}
        alt="close"
        onClick={clearSearch}
      />
    </div>
  );
}
