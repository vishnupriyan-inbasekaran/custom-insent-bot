import React from 'react';
import { mount } from 'enzyme';
import WidgetIconArea from '../components/widget-icon-area';

test('WidgetIconArea Component renders the popup message when widget is not opened', () => {
  const widgetProps = { 
    isWidgetOpen: false,
    initConvoInfo: {
      popupMessage: {
        message: "hello title message"
      }
    }
  };
  const wrapper = mount(
    <WidgetIconArea {...widgetProps} />
  );

  const p = wrapper.find('.convo-part');
  expect(p.text()).toBe('hello title message');
});
