import React from 'react'
import { Empty } from 'antd'

export default function ItemNotFound({ item }) {
    return (
        <div className="flex justify-center items-center pt-16">
            <Empty description={`Could not find selected ${item ? item : "item"}`} />
        </div>
    )
}
