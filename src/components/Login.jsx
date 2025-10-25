import { useState } from 'react'

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="z-100 fixed bottom-0 left-0 right-0 top-0 flex items-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="m-auto flex w-80 flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-8 py-12 text-gray-500 shadow-xl sm:w-[352px]"
      >
        <p className="m-auto text-2xl font-medium">
          {state === 'login' ? 'Login' : 'Cadastre-se'}
        </p>
        {state === 'register' && (
          <div className="w-full">
            <p>Nome</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Digite seu nome"
              className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Digite seu email"
            className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Senha</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Digite sua senha"
            className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
            type="password"
            required
          />
        </div>
        {state === 'register' ? (
          <p>
            Já tem conta?
            <span
              onClick={() => setState('login')}
              className="cursor-pointer text-primary outline-primary"
            >
              {' '}
              Faça login
            </span>
          </p>
        ) : (
          <p>
            Criar uma conta?
            <span
              onClick={() => setState('register')}
              className="cursor-pointer text-primary outline-primary"
            >
              {' '}
              Cadastre-se
            </span>
          </p>
        )}
        <button className="w-full cursor-pointer rounded-md bg-primary py-2 text-white outline-primary transition-all hover:bg-blue-800">
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
