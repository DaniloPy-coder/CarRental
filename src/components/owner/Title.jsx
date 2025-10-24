const Title = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-3xl font-medium">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-gray-500/90 md:text-base">
        {subtitle}
      </p>
    </>
  )
}

export default Title
