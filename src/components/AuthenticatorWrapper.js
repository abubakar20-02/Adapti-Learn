// AuthenticatorWrapper.js
import React from 'react';
import { Authenticator, View, Image, useTheme, Text } from '@aws-amplify/ui-react';
import logo from "../Resources/AdaptiLearn Logo.png";

const Header = () => {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={tokens.space.large}>
      <Image alt="AdaptiLearn logo" src={logo} />
    </View>
  );
};

const Footer = () => {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={tokens.space.large}>
      <Text color={tokens.colors.neutral[80]}>
        &copy; All Rights Reserved
      </Text>
    </View>
  );
};

const components = { Header, Footer };

const AuthenticatorWrapper = ({ children }) => (
  <Authenticator components={components}>
    {({ signOut, user }) => children({ signOut, user })}
  </Authenticator>
);

export default AuthenticatorWrapper;
