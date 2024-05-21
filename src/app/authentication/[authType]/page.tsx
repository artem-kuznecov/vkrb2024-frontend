'use client'

import styles from'./Authentication.module.scss'

import Link from 'next/link'
import cn from 'classnames'
import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { FoxIcon } from '@/ui/icons/FoxIcon'
import { login, register } from '@/utils/api/auth.api'
import { SnackAlert } from '@/ui/snack-alert/Snack'
import type { LoginDataType, RegisterDataType } from '@/data/types'

const AuthenticationPage = ({ params }: { params: { authType: string } }) => {
  const router = useRouter()

  const [snackState, setSnackState] = useState<{open: boolean, text: string, severity: 'error' | 'success'}>({
    open: false,
    text: '',
    severity: 'error'
  })

  const [mounted, setMounted] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repassword: '',
    rememberMe: false
  })

  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackState({ ...snackState, open: false })
  }

  const title = params.authType === 'login' ? 'Авторизация' : 'Регистрация'

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') setFormData({ ...formData, [e.target.name]: e.target.checked })
    else setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const requestData = params.authType === 'login' ?
      {
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe
      }
      :
      {
        username: formData.username,
        password: formData.password,
        repassword: formData.repassword,
      }
    if (params.authType === 'login') {
      const data = await login(requestData as LoginDataType)
      if (data.success === true) {
        setCookie('username', data.username)
        router.push('/')
      } else setSnackState({ open: true, text: data.message, severity: 'error' })
    }

    if (params.authType === 'register') {
      const data = await register(requestData as RegisterDataType)
      if (data.success === true) {
        const dataToLogin = {
          username: requestData.username,
          password: requestData.password
        }
        const loginResponse = await login(dataToLogin as LoginDataType)

        if (loginResponse.success === true) {
          setCookie('username', loginResponse.username)
          router.push('/')
        } else {
          setSnackState({ open: true, text: loginResponse.message, severity: 'error' })
          router.push('/authentication/login')
        }
      } else setSnackState({ open: true, text: data.message, severity: 'error' })
    }

    setFormData({
      username: '',
      password: '',
      repassword: '',
      rememberMe: false
    })
  }

  const validations = {
    hasNumber: formData.password.match(/\d+/) !== null,
    hasUppercaseLetter: formData.password.match(/[A-Z]/) !== null,
    hasSpecialSymbol: formData.password.match(/[!@#$%^&*№_]/g) !== null,
    isPasswordNotEmpty: !!formData.password,
    isRepasswordNotEmpty: !!formData.repassword,
    isUsernameNotEmpty: !!formData.username,
    isMatchingPasswords: formData.password === formData.repassword
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (params.authType !== 'login' && params.authType !== 'register') return redirect('/')
  return (
    <>
      <div
        className={cn(
          styles.auth_wrap,
          { [styles.bg1]: params.authType === 'login' },
          { [styles.bg2]: params.authType === 'register' },
        )}
      >
        <FoxIcon />
        <div data-form-wrapper>
          <form onSubmit={e => handleSubmit(e)}>
            <h1>{title}</h1>
            <input value={formData.username} name='username' type="text" placeholder='Имя пользователя' onChange={e => handleInputChange(e)} />
            <input value={formData.password} name='password' type="password" placeholder='Пароль' onChange={e => handleInputChange(e)} />
            {params.authType === 'register' && <input value={formData.repassword} name='repassword' type="password" placeholder='Повторите пароль' onChange={e => handleInputChange(e)} />}
            {params.authType === 'login' && <div data-options>
              <div data-remember-me className={styles.checkbox_wrap}>
                <label className={styles.checkbox}>
                  <input checked={formData.rememberMe} name='rememberMe' type='checkbox' hidden onChange={e => handleInputChange(e)}/>
                  <span data-square></span>
                  <p>Запомнить это устройство</p>
                </label>
              </div>
              <p>Забыли пароль?</p>
            </div>}

            {params.authType === 'register' && <div data-conditions>
              <p>Пароль должен:</p>
              <ul>
                <li data-checked={validations.hasUppercaseLetter}> - содержать хотя бы одну заглавную букву</li>
                <li data-checked={validations.hasNumber}> - содержать хотя бы одну цифру</li>
                <li data-checked={validations.hasSpecialSymbol}> - содержать хотя бы один специальный символ (@, №, # и подобные)</li>
                <li
                  data-checked={validations.isMatchingPasswords && validations.isPasswordNotEmpty && validations.isRepasswordNotEmpty}
                > - совпадать с повторным вводом</li>
              </ul>
            </div>}

            <button
              type='submit'
              disabled={
                (!(validations.isPasswordNotEmpty &&
              validations.isRepasswordNotEmpty &&
              validations.isUsernameNotEmpty &&
              validations.isMatchingPasswords) && params.authType === 'register') ||
              !(validations.isUsernameNotEmpty && validations.isPasswordNotEmpty) && params.authType === 'login'
              }
            >
              {params.authType === 'register' ? 'Зарегистрироваться' : 'Войти в аккаунт'}
            </button>
            <div data-helper>
              <p>{params.authType === 'register' ? 'Уже есть аккаунт?' : 'Нет учетной записи?'}</p>
              <Link
                href={params.authType === 'login' ? '/authentication/register' : '/authentication/login'}
              >
                {params.authType === 'register' ? 'Авторизуйтесь' : 'Зарегистрируйтесь'}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <SnackAlert open={snackState.open} text={snackState.text} severity={snackState.severity} handleClose={handleCloseSnack} />
    </>
  )
}

export default AuthenticationPage