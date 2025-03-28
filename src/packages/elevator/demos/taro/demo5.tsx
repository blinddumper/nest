import React from 'react'
import { Elevator } from '@nutui/nutui-react-taro'
import { Fabulous } from '@nutui/icons-react-taro'

const Demo5 = () => {
  const dataList = [
    {
      title: 'A',
      list: [
        {
          name: '安徽',
          id: 1,
        },
      ],
    },
    {
      title: 'B',
      list: [
        {
          name: '北京',
          id: 2,
        },
      ],
    },
    {
      title: 'G',
      list: [
        {
          name: '广西',
          id: 3,
        },
        {
          name: '广东',
          id: 4,
        },
      ],
    },
    {
      title: 'H',
      list: [
        {
          name: '湖南',
          id: 5,
        },
        {
          name: '湖北',
          id: 6,
        },
        {
          name: '河南',
          id: 7,
        },
      ],
    },
  ]
  const onItemClick = (key: string, item: any) => {
    console.log(key, JSON.stringify(item))
  }

  const onIndexClick = (key: string) => {
    console.log(key)
  }
  return (
    <Elevator
      className="test-elevator5"
      list={dataList}
      height="260"
      onItemClick={(key: string, item: any) => onItemClick(key, item)}
      onIndexClick={(key: string) => onIndexClick(key)}
    >
      <Elevator.Context.Consumer>
        {(value) => {
          return (
            <>
              <Fabulous size={12} />
              <span style={{ marginLeft: '15px' }}>{value?.name}</span>
            </>
          )
        }}
      </Elevator.Context.Consumer>
    </Elevator>
  )
}
export default Demo5
