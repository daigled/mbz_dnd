import { Race } from '../../interfaces'
import './RaceSummary.css'

function RaceSummary(props: any) {
	const race: Race = props.race

	return (
		<div className="race-summary">
			<h2 className="name">{race.name}</h2>
			<div className="source">
				<span className="detail-key">Source: </span>
				{race.source}, pg {race.page}
			</div>
			<div className="srd">
				<span className="detail-key">SRD: </span>
				{JSON.stringify(race.srd)}
			</div>
			<div className="size">
				<span className="detail-key">Size: </span>
				{JSON.stringify(race.size)}
			</div>
			<div className="speed">
				<span className="detail-key">Speed: </span>
				{JSON.stringify(race.speed)}
			</div>
			<div className="age">
				<span className="detail-key">Age: </span>
				{JSON.stringify(race.age)}
			</div>
			<div className="entries">
				<span className="detail-key">Entries: </span>
				<ul className="entries-list">
					{Array.isArray(race.entries)
						? race.entries.map(entry => (
								<li>
									<span className="entry-name">
										{entry.name}:
									</span>{' '}
									{JSON.stringify(entry.entries)}
								</li>
							))
						: JSON.stringify(race.entries)}
				</ul>
			</div>

			{!!race.ability && (
				<div className="ability">
					<span className="detail-key">Ability: </span>
					{JSON.stringify(race.ability)}
				</div>
			)}
			{!!race.heightAndWeight && (
				<div className="heightAndWeight">
					<span className="detail-key">Height &amp; Weight: </span>
					{JSON.stringify(race.heightAndWeight)}
				</div>
			)}
			{!!race.traitTags && (
				<div className="traitTags">
					<span className="detail-key">Trait Tags: </span>
					{JSON.stringify(race.traitTags)}
				</div>
			)}
			{!!race.resist && (
				<div className="resist">
					<span className="detail-key">Resistances: </span>
					{JSON.stringify(race.resist)}
				</div>
			)}
			{!!race.basicRules && (
				<div className="basicRules">
					<span className="detail-key">Basic Rules: </span>
					{JSON.stringify(race.basicRules)}
				</div>
			)}
			{!!race.darkvision && (
				<div className="darkvision">
					<span className="detail-key">Darkvision: </span>
					{JSON.stringify(race.darkvision)}
				</div>
			)}
			{!!race.lanuguageProficiencies && (
				<div className="lanuguageProficiencies">
					<span className="detail-key">Language Proficiencies: </span>
					{JSON.stringify(race.lanuguageProficiencies)}
				</div>
			)}
			{!!race.skillProficiencies && (
				<div className="skillProficiencies">
					<span className="detail-key">Skill Proficiencies: </span>
					{JSON.stringify(race.skillProficiencies)}
				</div>
			)}
			{!!race.toolProficiencies && (
				<div className="toolProficiencies">
					<span className="detail-key">Tool Proficiencies: </span>
					{JSON.stringify(race.toolProficiencies)}
				</div>
			)}
			{!!race.weaponProficiencies && (
				<div className="weaponProficiencies">
					<span className="detail-key">Weapon Proficiencies: </span>
					{JSON.stringify(race.weaponProficiencies)}
				</div>
			)}
			{!!race.additionalSpells && (
				<div className="additionalSpells">
					<span className="detail-key">Additional Spells: </span>
					{JSON.stringify(race.additionalSpells)}
				</div>
			)}
			{/* {!!race.subraces && (
				<div className="subraces">
					<span className="detail-key">Subraces: </span>
					{race.subraces.map(s => (
						<RaceSummary race={s} />
					))}
				</div>
			)} */}
		</div>
	)
}

export default RaceSummary
