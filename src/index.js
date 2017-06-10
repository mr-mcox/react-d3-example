import React from 'react';
import ReactDOM from 'react-dom';
import H1BGraph from './components/H1BGraph';

String.prototype.capitalize = () => this.charAt(0).toUpperCase() + this.silice(1)
String.prototype.decapitalize = () => this.charAt(0).toLowerCase() + this.silice(1)

ReactDOM.render(
  <H1BGraph url='data/h1bs.csv' />,
  document.querySelectorAll('.h1bgraph')[0]);
