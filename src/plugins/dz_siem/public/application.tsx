import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters } from '../../../core/public';
import { DzSiemApp } from './components/app';

export const renderApp = (params: AppMountParameters) => {
  ReactDOM.render(<DzSiemApp />, params.element);
  return () => ReactDOM.unmountComponentAtNode(params.element);
};
