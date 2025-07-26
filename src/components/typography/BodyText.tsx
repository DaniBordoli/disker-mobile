import React from 'react';
import { Text, TextProps } from 'react-native';

// Body S
export const BodyS: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[12px] leading-[16px] ${className}`} 
    style={[{ fontFamily: 'Geist-Medium' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const BodySLink: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[12px] leading-[16px] underline ${className}`} 
    style={[{ fontFamily: 'Geist-Medium' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const BodySStrong: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[12px] leading-[16px] ${className}`} 
    style={[{ fontFamily: 'Geist-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

// Body M
export const BodyM: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[14px] leading-[20px] ${className}`} 
    style={[{ fontFamily: 'Geist-Medium' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const BodyMLink: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[14px] leading-[20px] underline ${className}`} 
    style={[{ fontFamily: 'Geist-Medium' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const BodyMStrong: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[14px] leading-[20px] ${className}`} 
    style={[{ fontFamily: 'Geist-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);

// Body L
export const BodyL: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[16px] leading-[24px] ${className}`} 
    style={[{ fontFamily: 'Geist-Medium' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const BodyLLink: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[16px] leading-[24px] underline ${className}`} 
    style={[{ fontFamily: 'Geist-Medium' }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const BodyLStrong: React.FC<TextProps> = ({ className = '', children, style, ...props }) => (
  <Text 
    className={`text-[16px] leading-[24px] ${className}`} 
    style={[{ fontFamily: 'Geist-Bold' }, style]}
    {...props}
  >
    {children}
  </Text>
);
