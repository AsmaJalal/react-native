/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @oncall react_native
 * @fantom_flags enableFixForViewCommandRace:true
 */

import '../../../Core/InitializeCore.js';
import * as ReactNativeTester from '../../../../src/private/__tests__/ReactNativeTester';
import TextInput from '../TextInput';
import * as React from 'react';
import {useEffect, useLayoutEffect, useRef} from 'react';

describe('TextInput', () => {
  it('creates view before dispatching view command from ref function', () => {
    const root = ReactNativeTester.createRoot();

    ReactNativeTester.runTask(() => {
      root.render(
        <TextInput
          ref={node => {
            if (node) {
              node.focus();
            }
          }}
        />,
      );
    });

    const mountingLogs = root.getMountingLogs();

    expect(mountingLogs.length).toBe(2);
    expect(mountingLogs[0]).toBe('create view type: `AndroidTextInput`');
    expect(mountingLogs[1]).toBe(
      'dispatch command `focus` on component `AndroidTextInput`',
    );
  });

  it('creates view before dispatching view command from useLayoutEffect', () => {
    const root = ReactNativeTester.createRoot();

    function Component() {
      const textInputRef = useRef<null | React.ElementRef<typeof TextInput>>(
        null,
      );

      useLayoutEffect(() => {
        textInputRef.current?.focus();
      });

      return <TextInput ref={textInputRef} />;
    }
    ReactNativeTester.runTask(() => {
      root.render(<Component />);
    });

    const mountingLogs = root.getMountingLogs();

    expect(mountingLogs.length).toBe(2);
    expect(mountingLogs[0]).toBe('create view type: `AndroidTextInput`');
    expect(mountingLogs[1]).toBe(
      'dispatch command `focus` on component `AndroidTextInput`',
    );
  });

  it('creates view before dispatching view command from useEffect', () => {
    const root = ReactNativeTester.createRoot();

    function Component() {
      const textInputRef = useRef<null | React.ElementRef<typeof TextInput>>(
        null,
      );

      useEffect(() => {
        textInputRef.current?.focus();
      });

      return <TextInput ref={textInputRef} />;
    }
    ReactNativeTester.runTask(() => {
      root.render(<Component />);
    });

    const mountingLogs = root.getMountingLogs();

    expect(mountingLogs.length).toBe(2);
    expect(mountingLogs[0]).toBe('create view type: `AndroidTextInput`');
    expect(mountingLogs[1]).toBe(
      'dispatch command `focus` on component `AndroidTextInput`',
    );
  });
});
