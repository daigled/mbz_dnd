import { useState } from 'react'
import './Tabs.css'

export interface Tab {
	id: string
	name: string
	content: any
}

interface TabsProps {
	tabs: Tab[]
}

function Tabs(props: TabsProps) {
	const { tabs } = props

	const [activeTabId, setActiveTabId] = useState(tabs[0]['id'])

	const activeTab = tabs.find(t => t.id === activeTabId) ?? null

	return (
		<div className="tabs-component-wrap">
			<div className="tabs-header-wrap">
				<ul className={'tab-headers'}>
					{tabs.map(t => (
						<li
							className={
								activeTab && activeTab.id === t.id
									? 'active tab-header'
									: 'tab-header'
							}
							key={t.id}
							onClick={() => setActiveTabId(t.id)}>
							{t.name}
						</li>
					))}
				</ul>
			</div>
			<div className="tab-content-wrap">
				{activeTab ? activeTab.content : <>error...</>}
			</div>
		</div>
	)
}

export default Tabs
