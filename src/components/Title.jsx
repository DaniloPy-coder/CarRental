const Title = ({ title, subtitle, align }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        align === 'left' ? 'md:items-start md:text-left' : ''
      }`}
    >
      <h1 className="text-4xl font-semibold md:text-[40px]">{title}</h1>
      <p className="mt-2 max-w-[39rem] text-sm text-gray-500/90 md:text-base">
        {subtitle}
      </p>
    </div>
  )
}

export default Title
