import React from 'react';
import { mount } from 'enzyme';
import WidgetIconArea from '../components/widget-icon-area';

test('WidgetIconArea Component calls the toggleWidgetOpenState() function on clicking the bot icon', () => {
  const doneChange = jest.fn();
  const widgetProps = { 
    isWidgetOpen: false,
    initConvoInfo: {
      popupMessage: {
        message: "hello title message"
      }
    },
    toggleWidgetOpenState: doneChange
  };
  const wrapper = mount(
    <WidgetIconArea {...widgetProps} />
  );

  const botIcon = wrapper.find('.bot-widget-wrapper');
  botIcon.simulate('click');
  expect(doneChange).toBeCalledWith(!widgetProps.isWidgetOpen);
});
