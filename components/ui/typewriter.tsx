import { View, Text, TextProps } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'

interface TypewriterTextProps extends TextProps {
  text: string | string[]; 
  speed?: number;
  cursorChar?: string;
  className?: string;
}

export default function TypeWriter({
  text,
  speed = 70,
  cursorChar = '_',
  className = '',
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  
  const texts = Array.isArray(text) ? text : [text];
  const currentText = texts[0];

  // Typing effect
  useEffect(() => {
    if (index >= currentText.length) return;

    const typingInterval = setInterval(() => {
      setDisplayed(prev => prev + currentText[index]);
      setIndex(prev => prev + 1);
    }, speed);

    return () => clearInterval(typingInterval);
  }, [index, currentText, speed]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Text className={className}>
      { displayed }{ showCursor ? cursorChar : ' ' }
    </Text>
  )
}