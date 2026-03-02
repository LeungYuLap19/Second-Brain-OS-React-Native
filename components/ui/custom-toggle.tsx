import { useState } from 'react';
import { Host, Toggle } from '@expo/ui/swift-ui';

export default function CustomToggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <Host matchContents>
      <Toggle isOn={isOn} onIsOnChange={setIsOn} label="Enable Feature" />
    </Host>
  );
}
