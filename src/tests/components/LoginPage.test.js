import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage coorectly', () => {
  const wrapper = shallow(<LoginPage startGoogleLogin={() => {  }} startGithubLogin={() => {  }} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startGoogleLogin on button click', () => {
  const startLoginSpy = jest.fn();
  const wrapper = shallow(<LoginPage startGoogleLogin={startLoginSpy} startGithubLogin={() => {  }} />);
  wrapper.find('button').at(0).simulate('click');
  expect(startLoginSpy).toHaveBeenCalled();
});

test('should call startGithubLogin on button click', () => {
  const startLoginSpy = jest.fn();
  const wrapper = shallow(<LoginPage startGoogleLogin={() => {  }} startGithubLogin={startLoginSpy} />);
  wrapper.find('button').at(1).simulate('click');
  expect(startLoginSpy).toHaveBeenCalled();
});