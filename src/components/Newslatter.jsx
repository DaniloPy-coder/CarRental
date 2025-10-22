const Newsletter = () => {
  return (
    <div className="my-10 mb-40 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold md:text-4xl">
        Nunca perca uma oferta!
      </h1>
      <p className="max-w-xl pb-8 text-gray-500/70 md:text-lg">
        Assine para receber as últimas ofertas, novidades e descontos exclusivos
      </p>

      <form className="flex w-full max-w-2xl items-center justify-between overflow-hidden rounded-md border border-gray-300">
        <input
          className="h-12 flex-1 px-4 text-gray-700 outline-none"
          type="email"
          placeholder="Digite seu email"
          required
        />
        <button
          type="submit"
          className="h-12 cursor-pointer bg-primary px-8 text-white transition-all hover:bg-primary-dull md:px-12"
        >
          Inscrever-se
        </button>
      </form>
    </div>
  )
}

export default Newsletter
