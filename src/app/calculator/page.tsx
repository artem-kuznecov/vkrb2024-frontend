'use client'

import styles from'./Calculator.module.scss'

import { ChangeEvent, MouseEvent, useEffect, useState, useContext } from 'react'
import { SquareRadical, SquareDivide, SquareFunction, Pilcrow, Variable, Sigma } from 'lucide-react'
// import { useContext } from 'react'
// import { GlobalContext } from '@/app/providers'
import { Header } from '@/ui/header/Header'
import { LoadSpinner } from '@/components/load-spinner/Spinner'
import { GlobalContext } from '../providers'
import { getCookie } from 'cookies-next'
import { getKnowledgebaseParameters, getAllKnowledgebases, calculateKnowledgebase } from '@/utils/api/mlv.api'

type typeStringed = {
  [key:string]: string
}

type testeType = {
  input: typeStringed,
  output: string[]
}

const Calculator = () => {
  const { kbValue, setKbValue } = useContext(GlobalContext)
  const [chosenBaseUUID, setChosenBaseUUID] = useState<string>('')
  const [formData, setFormData] = useState<testeType>({
    input: {},
    output: []
  })
  const [parameters, setParameters] = useState<any[]>([])
  const [calculations, setCalculations] = useState<any>([])
  const [loadingParameters, setLoadingParameters] = useState<boolean>(false)
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false)

  const handleUpdateFormData = (e: ChangeEvent<HTMLInputElement>, parameter: any) => {
    let newFormData: testeType = formData
    const target = e.target as HTMLInputElement
    if (target.name === 'output-checkbox') {
      if (target.checked === true) newFormData = { ...formData, output: [...formData.output, parameter.id ] }
      else newFormData = { ...formData, output: formData.output.filter(b => b !== parameter.id) }
    }
    if (target.name === 'input-checkbox') {
      if (!target.value) {
        const newInput = newFormData.input
        delete newInput[parameter.id]
        newFormData = { ...formData, input: newInput }
      }
      else {
        newFormData = { ...newFormData, input: { ...newFormData.input, [parameter.id]: target.value } }
      }
    }
    setFormData(newFormData)
  }

  const handleCalculate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoadingResponse(true)
    calculateKnowledgebase(chosenBaseUUID, formData)
      .then(response => {
        setCalculations(response.data)
        setLoadingResponse(false)
      })
    document.querySelectorAll('input').forEach((element) => {
      const input = element as HTMLInputElement
      input.value = ''
      input.checked = false
    })
    setFormData({ input: {}, output: [] })
    // console.log(formData)
  }

  useEffect(() => {
    if (chosenBaseUUID) {
      setLoadingParameters(true)
      getKnowledgebaseParameters(chosenBaseUUID)
        .then(response => response.data)
        .then(data => {
          setParameters(data)
          setLoadingParameters(false)
        })
    }
  }, [chosenBaseUUID])

  useEffect(() => {
    if (!kbValue.length || kbValue) {
      const cookie_username = getCookie('username')
      getAllKnowledgebases(cookie_username as string)
        .then(response => response.data)
        .then((data: any[]) => {
          setKbValue(data)
        })
    }
  })

  return (
    <div className={styles.calculator}>
      <Header text='Калькулятор' />
      <span data-content-wrapper>
        <div data-content>
          <div data-knowledgebase-selection>
            <h2>Выберите базу знаний:</h2>
            <ul>
              {kbValue.map((byte: any) => (
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
                    parameters.length ?
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
                            {parameters.map(parameter => (
                              <tr key={parameter.uuid + '_row'}>
                                <td>{parameter.shortName}</td>
                                <td>{parameter.type}</td>
                                <td>
                                  <input type="text" disabled={formData.output.some(p => p === parameter.id)} name='input-checkbox' placeholder='Значение' onChange={(e) => handleUpdateFormData(e, parameter)} />
                                </td>
                                <td>
                                  <div data-checkbox-holder>
                                    <input id={parameter.uuid + '_input'} type="checkbox" disabled={Object.keys(formData.input).some(p => p === parameter.id)} name='output-checkbox' onChange={(e) => handleUpdateFormData(e, parameter)} />
                                    <label htmlFor={parameter.uuid + '_input'}>Рассчитать</label>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                      :
                      <div data-no-kb-chosen>
                        <div>
                          <Pilcrow />
                          <Variable />
                          <Sigma />
                        </div>
                        <p>База знаний не выбрана</p>
                      </div>
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
                    calculations.found && Object.keys(calculations.found).length ?
                      <table>
                        <thead>
                          <tr>
                            <th>UUID</th>
                            <th>Имя</th>
                            <th>Значение</th>
                          </tr>
                        </thead>
                        {
                          Object.keys(calculations.found).map(byte => {
                            const parameter = parameters.find(param => param.id === byte)
                            return (
                              <tbody key={parameter.uuid + '_answer'}>
                                <tr>
                                  <td>{parameter.id}</td>
                                  <td>{parameter.shortName}</td>
                                  <td>{calculations.found[byte]}</td>
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