import React from 'react';
import AnalysisContainer from './components/AnalysisContainer';
import Header from './components/Header';
import './index.css';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';

function BarcAnalysis() {
  hideStackedSideNav_secondary();
  return (
    <div className="h-[90vh]">
      <Header />
      <AnalysisContainer />
    </div>
  );
}

export default BarcAnalysis;
