import React from 'react';
import { Text, TextProps } from 'react-native';

export const Heading2XL: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text
    className={`text-[40px] leading-[52px] ${className}`}
    style={[{ fontFamily: 'Ronzino-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const HeadingXL: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text
    className={`text-[32px] leading-[40px] ${className}`}
    style={[{ fontFamily: 'Ronzino-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const HeadingL: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text
    className={`text-[24px] leading-[32px] ${className}`}
    style={[{ fontFamily: 'Ronzino-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const HeadingM: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text
    className={`text-[20px] leading-[28px] ${className}`}
    style={[{ fontFamily: 'Ronzino-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const HeadingS: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text
    className={`text-[16px] leading-[24px] ${className}`}
    style={[{ fontFamily: 'Ronzino-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const HeadingXS: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text
    className={`text-[14px] leading-[20px] ${className}`}
    style={[{ fontFamily: 'Ronzino-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const Heading2XS: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text
    className={`text-[12px] leading-[16px] ${className}`}
    style={[{ fontFamily: 'Ronzino-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);
