export function isObject(value: any): boolean {
	return value !== null && typeof value === 'object'
}

export const summarizeOptions = options =>
	options.reduce((acc, opt) => {
		Object.keys(opt).forEach(fieldKey => {
			let valueType: string = typeof opt[fieldKey]
			if (Array.isArray(opt[fieldKey])) valueType = 'array'

			if (Object.hasOwn(acc, fieldKey)) {
				acc[fieldKey]['count'] += 1
				if (!acc[fieldKey]['types'].includes(valueType))
					acc[fieldKey]['types'].push(valueType)

				if (valueType === 'object')
					acc[fieldKey]['subtypes'] = Object.keys(
						acc[fieldKey]
					).reduce((acc2, subFieldKey) => {
						const subValueType: string = Array.isArray(
							acc[fieldKey][subFieldKey]
						)
							? 'array'
							: typeof acc[fieldKey][subFieldKey]
						return acc2.includes(subValueType)
							? acc2
							: [...acc2, subValueType]
					}, [])
			} else
				acc[fieldKey] = { name: fieldKey, count: 1, types: [valueType] }
		})

		return acc
	}, {})
