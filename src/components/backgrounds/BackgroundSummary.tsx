import { Background } from '../../interfaces'
import './BackgroundSummary.css'

export default function BackgroundSummary(props: any) {
	const { setLanguages, setToolProficiencies, setSkillProficiences } = props
	const background: Background = props.background

	const cleanText = str => {
		const cleanedString = str
			.replace(/@item/g, '')
			.replace(/@skill/g, '')
			.replace(/@filter/g, '')
			.replace(/items/g, '')
			.replace(/source=/g, '')
			.replace(/type=gaming set/g, '')

			.replace(/miscellaneous=/g, '')
			.replace(/mundane/g, '')
			.replace(/type=instrument/g, '')
			.replace(/type=artisan's tools/g, '')
			.replace(/;dmg/g, '')
			.replace(/type=vehicle/g, '')

			.replace(/,type=instrument/g, '')

			.replace(/\|/g, '')
			.replace(/\{|\}/g, '')
			.replace(/phb/g, '')
			.trim()
		return cleanedString
	}

	return (
		<div className="background-summary" style={{ backgroundColor: 'grey' }}>
			<div className="source">
				<span className="detail-key">Source:</span>
				{background.source}
			</div>

			<div className="entries">
				<ul className="entries-list">
					{background.entries[0].items.map((item, index) => (
						<li key={index}>
							<span className="detail-key">
								{cleanText(item.name)}
							</span>{' '}
							{cleanText(item.entry)}
						</li>
					))}
					{background.entries[1].data && (
						<li>
							<span className="detail-key">
								{background.entries[1].name}
							</span>{' '}
							{background.entries[1].entries}
						</li>
					)}
					{background.entries.slice(2).map(sg => (
						<li>
							<span className="detail-key">{sg.name}:</span>
							{JSON.stringify(sg.entries[0])}
							{sg.entries[1].type === 'table' && (
								<table style={{ border: '1px solid' }}>
									<thead>
										<tr>
											{sg.entries[1].colLabels.map(
												(label, index) => (
													<th
														style={{
															border: '1px solid',
														}}
														key={index}>
														{label}
													</th>
												)
											)}
										</tr>
									</thead>
									<tbody>
										{sg.entries[1].rows.map(
											(row, rowIndex) => (
												<tr key={rowIndex}>
													{row.map(
														(cell, cellIndex) => (
															<td
																style={{
																	border: '1px solid',
																}}
																key={cellIndex}>
																{cell}
															</td>
														)
													)}
												</tr>
											)
										)}
									</tbody>
								</table>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
