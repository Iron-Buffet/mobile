/*
 * @link      http://industrialax.com/
 * @email     xristmas365@gmail.com
 * @author    Mark Lebel
 * @copyright Copyright (c) 2020 INDUSTRIALAX SOLUTIONS LLC
 * @license   https://industrialax.com/license
 */

import {RESTORE_DATA} from '../types';

export default (state, action) => {
  switch (action.type) {
    case RESTORE_DATA:
      return {
        ...state,
        fitStyles: action.fitStyles,
        exercises: action.exercises,
      };
    default:
      return {
        ...state,
      };
  }
};
