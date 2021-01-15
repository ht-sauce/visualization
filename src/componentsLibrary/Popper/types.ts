import { Options } from '@popperjs/core'

export enum visibility {
  hidden = 'hidden',
  visible = 'visible',
}
export interface dataType {
  show: visibility
}
export interface Props {
  trigger: string
  modelValue: boolean
  disabled: boolean
  arrow: boolean
  offset: number
  placement: string
  options: Options
  clickOutside: boolean
  zIndex: number
}
