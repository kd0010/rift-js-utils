import {ComponentProps, CSSProperties, forwardRef} from 'preact/compat'
import {useEffect, useMemo} from 'preact/hooks'
import {joinWithSpaces} from '../../../string/joinWithSpaces'
import {appendDivCss} from './appendDivCss'

interface Props extends ComponentProps<'div'> {
  width: string | number
  height: string | number
  padding?: CSSProperties['padding']
  margin?: CSSProperties['margin']
  bg?: CSSProperties['backgroundColor']
  color?: CSSProperties['color']
  order?: CSSProperties['order']
  basis?: CSSProperties['flexBasis']
  gap?: CSSProperties['gap']
  rowGap?: CSSProperties['columnGap']
  columnGap?: CSSProperties['rowGap']
  gridArea?: CSSProperties['gridArea']
  /** Hides the element while keeping it in DOM. */
  hidden?: boolean
  hidesOverflownText?: boolean
  hidesOverflownTextAllowingWrap?: boolean
  row?: boolean
  col?: boolean
  centered?: boolean
  centeredX?: boolean
  centeredY?: boolean
  alignedTop?: boolean
  alignedBottom?: boolean
  alignedLeft?: boolean
  alignedRight?: boolean
  contentCentered?: boolean
  contentCenteredX?: boolean
  contentCenteredY?: boolean
  contentAlignedTop?: boolean
  contentAlignedBottom?: boolean
  contentAlignedRight?: boolean
  contentAlignedLeft?: boolean
  baselined?: boolean
  spacedBetween?: boolean
  spacedAround?: boolean
  spacedEvenly?: boolean
  wraps?: boolean
  grows?: boolean
  doesNotShrink?: boolean
  selfCentered?: boolean
  selfAlignedStart?: boolean
  selfAlignedEnd?: boolean
  selfBaselined?: boolean
}

export const Div = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    useEffect(() => appendDivCss('Div-css'), [])

    const className = useMemo(() => {
      return joinWithSpaces(
        typeof props.className == 'string' && props.className,
        props.hidden && 'Div-hidden',
        props.hidesOverflownText && 'Div-hide-overflown-text-nowrap',
        props.hidesOverflownTextAllowingWrap && 'Div-hide-overflown-text-wrap',
        props.row && 'Div-flex-row',
        props.col && 'Div-flex-col',
        props.centered && 'Div-center-x-y',
        props.centeredX && (props.col ? 'Div-center-y' : 'Div-center-x'),
        props.centeredY && (props.col ? 'Div-center-x' : 'Div-center-y'),
        props.alignedTop && (props.col ? 'Div-flex-start-x' : 'Div-flex-start-y'),
        props.alignedBottom && (props.col ? 'Div-flex-end-x' : 'Div-flex-end-y'),
        props.alignedLeft && (props.col ? 'Div-flex-start-y' : 'Div-flex-start-x'),
        props.alignedRight && (props.col ? 'Div-flex-end-y' : 'Div-flex-end-x'),
        props.contentCentered && 'Div-content-center-x-y',
        props.contentCenteredX && (props.col ? 'Div-content-center-y' : 'Div-content-center-x'),
        props.contentCenteredY && (props.col ? 'Div-content-center-x' : 'Div-content-center-y'),
        props.contentAlignedTop && (props.col ? 'Div-content-flex-start-x' : 'Div-content-flex-start-y'),
        props.contentAlignedBottom && (props.col ? 'Div-content-flex-end-x' : 'Div-content-flex-end-y'),
        props.contentAlignedLeft && (props.col ? 'Div-content-flex-start-y' : 'Div-content-flex-start-x'),
        props.contentAlignedRight && (props.col ? 'Div-content-flex-end-y' : 'Div-content-flex-end-x'),
        props.baselined && 'Div-flex-baseline',
        props.spacedBetween && 'Div-flex-space-between',
        props.spacedAround && 'Div-flex-space-around',
        props.spacedEvenly && 'Div-flex-space-evenly',
        props.wraps && 'Div-flex-allow-wrap',
        props.grows && 'Div-flex-grow-1',
        props.doesNotShrink && 'Div-flex-shrink-0',
        props.selfCentered && 'Div-self-center',
        props.selfAlignedStart && 'Div-self-flex-start',
        props.selfAlignedEnd && 'Div-self-flex-end',
        props.selfBaselined && 'Div-self-baseline',
      )
    }, [
      props.className,
      props.hidden,
      props.hidesOverflownText,
      props.hidesOverflownTextAllowingWrap,
      props.row,
      props.col,
      props.centered,
      props.centeredX,
      props.centeredY,
      props.alignedTop,
      props.alignedBottom,
      props.alignedLeft,
      props.alignedRight,
      props.contentCentered,
      props.contentCenteredX,
      props.contentCenteredY,
      props.contentAlignedTop,
      props.contentAlignedBottom,
      props.contentAlignedLeft,
      props.contentAlignedRight,
      props.baselined,
      props.spacedBetween,
      props.spacedAround,
      props.spacedEvenly,
      props.wraps,
      props.grows,
      props.doesNotShrink,
      props.selfCentered,
      props.selfAlignedStart,
      props.selfAlignedEnd,
      props.selfBaselined,
    ])

    const style = useMemo(() => {
      const style: typeof props.style = {
        width: (typeof props.width == 'string' || typeof props.width == 'number') ? props.width : undefined,
        height: (typeof props.height == 'string' || typeof props.height == 'number') ? props.height : undefined,
        padding: props.padding,
        margin: props.margin,
        backgroundColor: props.bg,
        color: props.color,
        order: props.order,
        basis: props.basis,
        gap: props.gap,
        rowGap: props.rowGap,
        columnGap: props.columnGap,
        gridArea: props.gridArea,
        ...(typeof props.style == 'object' ? props.style : {}),
      }

      return style
    }, [
      props.width,
      props.height,
      props.padding,
      props.margin,
      props.bg,
      props.color,
      props.order,
      props.basis,
      props.gap,
      props.rowGap,
      props.columnGap,
      props.gridArea,
      props.style,
    ])

    return (
      <div
        {...props}
        hidden={false} // Reclaim the keyword for custom use
        className={className}
        style={style}
        ref={ref}
      />
    )
  }
)
