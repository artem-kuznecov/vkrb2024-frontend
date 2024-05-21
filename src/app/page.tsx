'use client'

import styles from'./page.module.scss'

import { MouseEvent, ChangeEvent, useEffect, useState, useContext } from 'react'
import { Minus } from 'lucide-react'
import { getCookie } from 'cookies-next'
import { format } from 'date-fns'
import { Header } from '@/ui/header/Header'
import { EmptyData } from '@/ui/empty-data/EmptyData'
import { getAllKnowledgebases, uploadKnowledgebase } from '@/utils/api/mlv.api'

import { GlobalContext } from './providers'

const Dashboard = () => {
  const { setKbValue } = useContext(GlobalContext)
  const [trigger, setTrigger] = useState<boolean>(false)
  const [knowledgebases, setKnowledgebases] = useState<any[]>([])

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
    formData.append('username', getCookie('username') as string)
    uploadKnowledgebase(formData).then(response => {
      console.log(response)
      setTrigger(prev => !prev)
    })
    e.target.value = ''
    return
  }

  useEffect(() => {
    const cookie_username = getCookie('username')
    getAllKnowledgebases(cookie_username as string)
      .then(response => response.data)
      .then((data: any[]) => {
        setKnowledgebases(data)
        setKbValue(data)
      })
  }, [trigger, setKbValue])

  return (
    <div className={styles.dashboard}>
      <Header text='Дашборд'/>
      <form>
        <input id='knowledgebase-input' type='file' accept='.yaml, .yml' hidden onChange={e => filePick(e)} />
        <label htmlFor='knowledgebase-input'>Загрузить базу знаний</label>
      </form>
      <div data-grid>
        {
          knowledgebases.length ?
            knowledgebases.map(byte => (
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