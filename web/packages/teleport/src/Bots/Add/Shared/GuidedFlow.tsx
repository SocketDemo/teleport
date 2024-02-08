/**
 * Teleport
 * Copyright (C) 2023  Gravitational, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';

import Flex from 'design/Flex';
import Text from 'design/Text';

import { Navigation } from 'teleport/components/Wizard/Navigation';

export type FlowStepProps = {
  nextStep?: () => void;
  prevStep?: () => void;
};

export type View = {
  component: (props: FlowStepProps) => JSX.Element;
  name: string;
};

export type FlowProps = {
  name: string;
  title: string;
  views: View[];
  icon: JSX.Element;
};

export function GuidedFlow({ name, title, views, icon }: FlowProps) {
  if (views.length < 1) {
    return null;
  }

  const steps = views.length;
  let [currentStep, setCurrentStep] = useState(0);

  function handleNextStep() {
    if (currentStep < steps - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePrevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  const currentView = views[currentStep];
  const Component = currentView.component;

  return (
    <>
      <Flex pt="3">
        {icon}
        <Text bold ml="2" mr="4">
          {name}
        </Text>
        <Navigation
          currentStep={currentStep}
          views={views.map(v => ({ title: v.name }))}
        />
      </Flex>
      <Text as="h2" fontSize="24px" mt="4" mb="3">
        {title}
      </Text>
      <Component nextStep={handleNextStep} prevStep={handlePrevStep} />
    </>
  );
}