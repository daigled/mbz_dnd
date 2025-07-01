import React from 'react'

interface DropdownOption {
	label: string
	value: string
}

interface DropdownProps {
	label: string
	options: DropdownOption[]
	onChange: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
	label,
	options,

	onChange,
}) => {
	return (
		<div style={{ margin: '1rem 0' }}>
			<label style={{ marginRight: '0.5rem' }}>{label}:</label>
			<select onChange={e => onChange(e.target.value)}>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

export default Dropdown
