import {GET_STYLES} from "./types";

export const getStyles = (styles) => ({
  type: GET_STYLES,
  data: styles,
})
