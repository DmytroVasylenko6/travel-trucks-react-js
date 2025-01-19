const Button = ({ text, className, onClick, type }) => {
  return (
    <button type={type || 'button'} onClick={onClick} className={className}>
      {text}
    </button>
  )
}

export default Button
