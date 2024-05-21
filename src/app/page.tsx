'use client'

import styles from'./page.module.scss'

import { MouseEvent, ChangeEvent, useContext } from 'react'
import { Minus } from 'lucide-react'
import { format } from 'date-fns'
import { Header } from '@/ui/header/Header'
import { GlobalContext } from '@/app/providers'
import { EmptyData } from '@/ui/empty-data/EmptyData'

const mockdata: any[] = [
  {
    'uuid': '33c02ab5-479e-43cf-9fc7-110be14c930a',
    'id': '37cb2247-3b2e-4784-8fc1-f67291e4080e',
    'shortName': 'Сумма двух чисел',
    'uploadedDate': '2024-05-21T07:08:20Z',
    'parametersCount': 3,
    'username': 'username1'
  }
]

const Dashboard = () => {
  const { username } = useContext(GlobalContext)

  const handleSpanClick = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement
    const contentBlock = target.closest('span[data-open]:not([data-icon])') as HTMLSpanElement
    const infoBlock = contentBlock.querySelector('div[data-info]') as HTMLDivElement
    const openState = contentBlock.dataset.open === 'true'
    target.dataset.open = String(!openState)
    contentBlock.dataset.open = String(!openState)
    infoBlock.dataset.open = String(!openState)
  }

  const filePick = async (e: ChangeEvent<HTMLInputElement>) => {
    let formData = new FormData()
    formData.append('file', e.target.files?.item(0) as Blob)
    formData.append('username', username as string)
  }

  return (
    <div className={styles.dashboard}>
      <Header text='Дашборд'/>
      <form>
        <input id='knowledgebase-input' type='file' accept='.yaml, .yml' hidden onChange={e => filePick(e)}/>
        <label htmlFor='knowledgebase-input'>Загрузить базу знаний</label>
      </form>
      <div data-grid>
        {
          mockdata.length ?
            mockdata.map(byte => (
              <span data-open={false} key={byte.uuid}>
                <div data-header>
                  <h2>{byte.shortName}</h2>
                  <span data-icon data-open={false} onClick={e => handleSpanClick(e)}>
                    <Minus data-left />
                    <Minus data-right />
                  </span>
                </div>
                <div data-info data-open={false}>
                  <p>Количество параметров: {byte.parametersCount}</p>
                  <p>Добавлена {format(Date.parse(byte.uploadedDate), 'dd.MM.yyyy')}</p>
                  <p data-description>UUID: {byte.uuid}</p>
                </div>
              </span>
            ))
            :
            <EmptyData text='У вас пока нет загруженных баз знаний' />
        }
      </div>
    </div>
  )
}

export default Dashboard