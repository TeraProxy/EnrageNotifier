// Version 1.1.2

const Command = require('command'),
	GameState = require('tera-game-state'),
	CENTER_ALERT = require('./config.json').CENTER_ALERT // if true, shows an additional alert in the middle of your screen (streamers should turn this off)

module.exports = function enragenotifier(dispatch) {
	const command = Command(dispatch),
		game = GameState(dispatch)

	let hpMax,
		hpCurrent,
		hpPercent,
		nextEnrage,
		enabled = true,
		inHH = false,
		wasEnraged = 0,
		bosses = new Set()

	// ############# //
	// ### Hooks ### //
	// ############# //

	game.me.on('change_zone', (zone, quick) => {
		inHH = zone == 9950
	})

	dispatch.hook('S_BOSS_GAGE_INFO', 3, (event) => {
		bosses.add("" + event.id) // work with strings so there's no chance JS screws up
		hpMax = event.maxHp
		hpCurrent = event.curHp
		hpPercent = Math.floor(hpCurrent / hpMax * 100)
		nextEnrage = (hpPercent > 10) ? (hpPercent - 10) : 0
	})

	dispatch.hook('S_NPC_STATUS', 1, (event) => {
		if(!enabled || inHH) return
		if(!(bosses.has("" + event.creature))) return

		if(event.enraged == 0 && wasEnraged == 1) {
			wasEnraged = 0
			let messageString = '<font color="#FFFFFF" size="25">Next Enrage at </font><font color="#FF0000" size="30">' + nextEnrage + '%</font>'
			if(nextEnrage > 0) {
				if(CENTER_ALERT) notify(messageString)
				notifyChat(messageString)
			}
		}

		if(event.enraged == 1 && wasEnraged == 0) {
			wasEnraged = 1
			if(CENTER_ALERT) notify('<font color="#FF0000" size="50">Boss Enraged!</font>')
		}
	})

	dispatch.hook('S_DESPAWN_NPC', 3, (event) => {
		if(bosses.delete("" + event.target)) wasEnraged = 0
	})

	// ################# //
	// ### Functions ### //
	// ################# //

	function notify(msg) {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
			unk1: 42, // 42 Blue Shiny Text, 31 Normal Text
			unk2: 0,
			unk3: 27,
			message: msg
		})
	}

	function notifyChat(msg) {
		command.message(' ' + msg)
	}

	// ################ //
	// ### Commands ### //
	// ################ //
	
	command.add('enrage', (param) => {
		if(param == null) {
			enabled = !enabled
			command.message('[Enrage Notifier] ' + (enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Enrage Notifier] ' + (enabled ? 'enabled' : 'disabled'))
		}
		else if(param == "alert") {
			CENTER_ALERT = !CENTER_ALERT
			command.message('[Enrage Notifier] alerts ' + (CENTER_ALERT ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Enrage Notifier] alerts ' + (CENTER_ALERT ? 'enabled' : 'disabled'))
		}
		else command.message('Commands:<br>'
							+ ' "enrage" (enable/disable EnrageNotifier),<br>'
							+ ' "enrage alert" (enable/disable alerts in the center of your screen)'
			)
	})
}