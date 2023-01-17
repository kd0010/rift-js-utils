import { FunctionComponent } from 'preact'

interface Props {
  /**
   * CSS value.
   */
  value: string
  /**
   * Apply horizontally.
   */
  h?: boolean
}

/**
 * Provides a modular way to apply whitespace
 * between, before or after elements.
 */
export const Whitespace: FunctionComponent<Props> = ({
  value,
  h,
}) => {
  if (h) return <div style={{ paddingRight: value }} />
  else return <div style={{ paddingBottom: value }} />
}
