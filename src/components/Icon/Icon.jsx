import sprite from '../../img/icons/sprite.svg'
const Icon = ({ onClick, id, fill, size, className, stroke, ...props }) => {
  return (
    <svg
      onClick={onClick}
      className={`${className || ''}`.trim()}
      width={size}
      height={size}
      {...props}
    >
      <use
        xlinkHref={`${sprite}#${id}`}
        style={{ fill: fill, stroke: stroke }}
      />
    </svg>
  )
}

export default Icon
