import React from 'react';

import PauseButton from './applets/PauseButton';
import ActionsButton from './applets/ActionsButton';
import NationalApproval from './applets/NationalApproval';
import BudgetIndicator from './applets/BudgetIndicator';
// import MapSettingsButton from './applets/MapSettingsButton';
import VaccinesButton from './applets/VaccinesButton';
// import DashboardButton from './applets/DashboardButton';
import ImmunityBar from './applets/ImmunityBar';
import AdvanceTurnButton from './applets/AdvanceTurnButton';

const TopBar: React.FC = () => (
  <nav className="dark:bg-gray-700 dark:text-gray-200">
    <div className="flex flex-row divide-x dark:divide-gray-900 justify-between shadow">
      <PauseButton />
      <ActionsButton />
      <NationalApproval />
      <BudgetIndicator />
      <div className="mr-auto" />
      {/* <MapSettingsButton /> */}
      <VaccinesButton />
      {/* <DashboardButton /> */}
      <ImmunityBar />
      <AdvanceTurnButton />
    </div>
  </nav>
);

export default TopBar;
