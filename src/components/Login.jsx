import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { api } from '../services/api'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const navigate = useNavigate()
  const { setShowLogin, fetchUser, setToken } = useContext(AppContext)

  const [state, setState] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'login') {
        const { data } = await api.post('/session', {
          email,
          password,
        })

        localStorage.setItem('token', data.token)
        setToken(data.token)
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`

        await fetchUser()

        toast.success('Login realizado com sucesso ✅')

        setShowLogin(false)
      }

      if (state === 'register') {
        await api.post('/users', {
          name,
          email,
          password,
        })

        const { data } = await api.post('/session', {
          email,
          password,
        })

        localStorage.setItem('token', data.token)
        setToken(data.token)
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`

        await fetchUser()

        toast.success('Cadastro realizado com sucesso ✅')

        setShowLogin(false)
        navigate('/')
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          'Email ou senha inválidos ❌',
      )
    }
  }

  return (
    <section
      onClick={() => setShowLogin(false)}
      className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex items-center justify-center bg-black/40 text-sm text-gray-600"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex w-80 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 py-12 shadow-xl sm:w-[352px]"
      >
        <p className="m-auto text-2xl font-medium text-primary">
          {state === 'login' ? 'Login' : 'Cadastro'}
        </p>
        {state === 'register' && (
          <div className="w-full">
            <p>Nome</p>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
          />
        </div>
        <div className="w-full">
          <p>Senha</p>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-md bg-primary py-2 text-white"
        >
          {state === 'register' ? 'Cadastrar' : 'Login'}
        </button>

        <p className="mt-2 text-center text-sm">
          {state === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <span
            onClick={() => {
              setState(state === 'login' ? 'register' : 'login')
              setName('')
              setEmail('')
              setPassword('')
            }}
            className="cursor-pointer text-primary"
          >
            {state === 'login' ? 'Cadastre-se' : 'Faça login'}
          </span>
        </p>
      </form>
    </section>
  )
}

export default Login
