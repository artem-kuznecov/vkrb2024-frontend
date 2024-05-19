'use client'

import styles from'./Authentication.module.scss'

import Link from 'next/link'
import cn from 'classnames'
import { FormEvent, useState, ChangeEvent } from 'react'
import { redirect } from 'next/navigation'
import { FoxIcon } from '@/ui/icons/FoxIcon'

const AuthenticationPage = ({ params }: { params: { authType: string } }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repassword: '',
    rememberMe: false
  })

  const title = params.authType === 'login' ? 'Авторизация' : 'Регистрация'

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') setFormData({ ...formData, [e.target.name]: e.target.checked })
    else setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    console.log(requestData)
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

  if (params.authType !== 'login' && params.authType !== 'register') return redirect('/')
  return (
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
          <input name='username' type="text" placeholder='Имя пользователя' onChange={e => handleInputChange(e)} />
          <input name='password' type="password" placeholder='Пароль' onChange={e => handleInputChange(e)} />
          {params.authType === 'register' && <input name='repassword' type="password" placeholder='Повторите пароль' onChange={e => handleInputChange(e)} />}
          {params.authType === 'login' && <div data-options>
            <div data-remember-me className={styles.checkbox_wrap}>
              <label className={styles.checkbox}>
                <input name='rememberMe' type='checkbox' hidden onChange={e => handleInputChange(e)}/>
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
            <p>{params.authType === 'login' ? 'Уже есть аккаунт?' : 'Нет учетной записи?'}</p>
            <Link
              href={params.authType === 'login' ? '/authentication/register' : '/authentication/login'}
            >
              {params.authType === 'login' ? 'Авторизуйтесь' : 'Зарегистрируйтесь'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthenticationPage