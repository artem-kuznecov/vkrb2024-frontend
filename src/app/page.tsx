'use client'

import styles from'./page.module.scss'

import { MouseEvent } from 'react'
import { Header } from '@/ui/header/Header'
import { Minus } from 'lucide-react'

const mockdata = [
  {
    'uuid': '1',
    'name': 'math-sum.yamltest',
    'username': 'username3'
  },
  {
    'uuid': '2',
    'name': 'math-formula.yaml',
    'username': 'username3'
  },
  {
    'uuid': '3',
    'name': 'math-formula.yaml',
    'username': 'username3'
  },
  {
    'uuid': '4',
    'name': 'math-sum.yaml',
    'username': 'username3'
  },
  {
    'uuid': '5',
    'name': 'math-formula.yaml',
    'username': 'username3'
  },
  {
    'uuid': '6',
    'name': 'math-formula.yaml',
    'username': 'username3'
  },
  {
    'uuid': '7',
    'name': 'math-sum.yaml',
    'username': 'username3'
  },
  {
    'uuid': '8',
    'name': 'math-formula.yaml',
    'username': 'username3'
  },
  {
    'uuid': 'e9',
    'name': 'math-formula.yaml',
    'username': 'username3'
  },
  {
    'uuid': '10',
    'name': 'math-sum.yaml',
    'username': 'username3'
  },
  {
    'uuid': '11',
    'name': 'math-formula.yaml',
    'username': 'username3'
  },
  {
    'uuid': '12',
    'name': 'math-formula.yaml',
    'username': 'username3'
  }
]

const Dashboard = () => {
  const handleSpanClick = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement
    const contentBlock = target.closest('span[data-open]:not([data-icon])') as HTMLSpanElement
    const infoBlock = contentBlock.querySelector('div[data-info]') as HTMLDivElement
    const openState = contentBlock.dataset.open === 'true'
    target.dataset.open = String(!openState)
    contentBlock.dataset.open = String(!openState)
    infoBlock.dataset.open = String(!openState)
  }

  return (
    <div className={styles.dashboard}>
      <Header text='Дашборд'/>
      <div data-grid>
        {mockdata.map(byte => (
          <span data-open={false} key={byte.uuid}>
            <div data-header>
              <h2>{byte.name}</h2>
              <span data-icon data-open={false} onClick={e => handleSpanClick(e)}>
                <Minus data-left />
                <Minus data-right />
              </span>
            </div>
            <div data-info data-open={false}>
              <p>Переменных: 3</p>
              <p>Количество расчетов: 3</p>
              <p>Добавлена: 3 февраля 2021</p>
              <p data-description>
                Математика(формула) - такая то база знаний и еще какое-то описание
              </p>
            </div>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Dashboard