'use client'

import styles from'./Calculator.module.scss'

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { SquareRadical, SquareDivide, SquareFunction } from 'lucide-react'
// import { useContext } from 'react'
// import { GlobalContext } from '@/app/providers'
import { Header } from '@/ui/header/Header'
import { LoadSpinner } from '@/components/load-spinner/Spinner'

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

const params: any[] = [
  {
    'uuid': 'fcbc85d7-7ced-4e0d-8c4f-ab114d8cd810',
    'id': '3efb49fd-ccbd-473e-bc82-080827f40567',
    'shortName': 'number_2',
    'type': 'double',
    'defaultValue': '0',
    'isSecret': false
  },
  {
    'uuid': '040ff199-9fd2-4c36-b3aa-97adecad439b',
    'id': '9ea9a909-5b1c-4e81-926f-0be856c4bcb8',
    'shortName': 'Summary',
    'type': 'double',
    'defaultValue': '',
    'isSecret': false
  },
  {
    'uuid': '5898dd95-6383-42b8-850e-802017004a9f',
    'id': 'f8a49e5c-098c-471b-9a22-bb5b6d294bf8',
    'shortName': 'number_1',
    'type': 'double',
    'defaultValue': '0',
    'isSecret': false
  }
]

type typeStringed = {
  [key:string]: string
}

type testeType = {
  input: typeStringed,
  output: string[]
}

const response: typeStringed = {
  // '9ea9a909-5b1c-4e81-926f-0be856c4bcb8': '5'
}

const Calculator = () => {
  // const { username, setUsername } = useContext(GlobalContext)
  const [chosenBaseUUID, setChosenBaseUUID] = useState<string>('')
  // const [baseParameters, setBaseparameters] = useState([])
  const [formData, setFormData] = useState<testeType>({
    input: {},
    output: []
  })
  const [loadingParameters] = useState<boolean>(false)
  const [loadingResponse] = useState<boolean>(false)

  const handleUpdateFormData = (e: ChangeEvent<HTMLInputElement>, parameter: any) => {
    let newFormData: testeType = formData
    const target = e.target as HTMLInputElement
    if (target.name === 'output-checkbox') {
      if (target.checked === true) newFormData = { ...formData, output: [...formData.output, parameter.uuid ] }
      else newFormData = { ...formData, output: formData.output.filter(b => b !== parameter.uuid) }
    }
    if (target.name === 'input-checkbox') {
      if (!target.value) {
        const newInput = newFormData.input
        delete newInput[parameter.uuid]
        newFormData = { ...formData, input: newInput }
      }
      else {
        newFormData = { ...newFormData, input: { ...newFormData.input, [parameter.uuid]: target.value } }
      }
    }
    setFormData(newFormData)
  }

  const handleCalculate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(formData)
  }

  useEffect(() => {
    console.log('base changed')
  }, [chosenBaseUUID])

  return (
    <div className={styles.calculator}>
      <Header text='Калькулятор' />
      {/* <p>{JSON.stringify(formData)}</p> */}
      <span data-content-wrapper>
        <div data-content>
          <div data-knowledgebase-selection>
            <h2>Выберите базу знаний:</h2>
            <ul>
              {mockdata.map(byte => (
                <li key={byte.uuid + '_kb'} data-chosen={chosenBaseUUID === byte.uuid} onClick={() => setChosenBaseUUID(byte.uuid)}>
                  <p>{byte.shortName}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span style={{ width: '60%' }}>
          <div data-calculator>
            {
              !loadingParameters ?
                <>
                  {
                    params.length ?
                      <>
                        <table>
                          <thead>
                            <tr>
                              <th>Имя</th>
                              <th>Тип</th>
                              <th>Значение</th>
                              <th style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <button
                                  disabled={!Object.keys(formData.input).length || !formData.output.length}
                                  onClick={e => handleCalculate(e)}
                                >
                            Расчет
                                </button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {params.map(parameter => (
                              <tr key={parameter.uuid + '_row'}>
                                <td>{parameter.shortName}</td>
                                <td>{parameter.type}</td>
                                <td>
                                  <input type="text" disabled={formData.output.some(p => p === parameter.uuid)} name='input-checkbox' placeholder='Значение' onChange={(e) => handleUpdateFormData(e, parameter)} />
                                </td>
                                <td>
                                  <div data-checkbox-holder>
                                    <input id={parameter.uuid + '_input'} type="checkbox" disabled={Object.keys(formData.input).some(p => p === parameter.uuid)} name='output-checkbox' onChange={(e) => handleUpdateFormData(e, parameter)} />
                                    <label htmlFor={parameter.uuid + '_input'}>Рассчитать</label>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                      :
                      <p>не выбрана бз</p>
                  }
                </>
                :
                <LoadSpinner />
            }
          </div>
          <div data-answers>
            {
              !loadingResponse ?
                <>
                  {
                    Object.keys(response).length ?
                      <table>
                        <thead>
                          <tr>
                            <th>UUID</th>
                            <th>Имя</th>
                            <th>Значение</th>
                          </tr>
                        </thead>
                        {
                          Object.keys(response).map(byte => {
                            const parameter = params.find(param => param.id === byte)
                            return (
                              <tbody key={parameter.uuid + '_answer'}>
                                <tr>
                                  <td>{parameter.id}</td>
                                  <td>{parameter.shortName}</td>
                                  <td>{response[parameter.id]}</td>
                                </tr>
                              </tbody>
                            )
                          })
                        }
                      </table>
                      :
                      <div data-no-response>
                        <div>
                          <SquareDivide />
                          <SquareFunction />
                          <SquareRadical />
                        </div>
                        <p>Результатов пока нет</p>
                      </div>
                  }
                </>
                :
                <LoadSpinner />
            }
          </div>
        </span>
      </span>
    </div>
  )
}

export default Calculator