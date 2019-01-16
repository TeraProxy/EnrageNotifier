'use strict'

module.exports = function EnrageNotifier(mod) {

	let hpPercent,
		nextEnrage,
		inHH = false,
		enraged = 0,
		bosses = new Set(),
		niceName = mod.proxyAuthor !== 'caali' ? '[Enrage] ' : ''

	// ############# //
	// ### Hooks ### //
	// ############# //

	mod.game.me.on('change_zone', (zone, quick) => {
		inHH = zone === 9950
	})

	mod.hook('S_BOSS_GAGE_INFO', 3, event => {
		bosses.add(event.id.toString()) // work with strings so there's no chance JS screws up
		hpPercent = Math.floor(Number(event.curHp * 10000n / event.maxHp) / 100)
		nextEnrage = (hpPercent > 10) ? (hpPercent - 10) : 0
	})

	mod.hook('S_SPAWN_NPC', 11, event => {
		if(!mod.settings.enabled || inHH) return
		if(!bosses.has(event.gameId.toString())) return

		let remainingEnrageTime = event.remainingEnrageTime / 1000

		if(event.mode != enraged) {
			if(enraged == 1) {
				let messageString = '<font color="#FFFFFF">Next Enrage at </font><font color="#FF0000">' + nextEnrage + '%</font>'
				if(nextEnrage > 0) {
					if(mod.settings.CENTER_ALERT) notify(messageString)
					notifyChat(messageString)
				}
			}
			else {
				if(mod.settings.CENTER_ALERT) notify('<font color="#FF0000">Boss Enraged!</font>')
				if(mod.settings.SHOW_ENRAGE_TIME) notifyChat('<font color="#FF0000">Boss Enraged for </font><font color="#FFFFFF">' + remainingEnrageTime + ' seconds</font>')
			}
			enraged = enraged == 1 ? 0 : 1
		}
	})

	mod.hook('S_DESPAWN_NPC', 3, event => {
		if(bosses.delete(event.gameId.toString())) enraged = 0
	})

	// ################# //
	// ### Functions ### //
	// ################# //

	function notify(msg) {
		mod.toClient('S_DUNGEON_EVENT_MESSAGE', 2, {
			type: 31,
			chat: false,
			channel: 27,
			message: msg
		})
	}

	function notifyChat(msg) {
		mod.command.message(niceName + msg)
	}

	// ################ //
	// ### Commands ### //
	// ################ //
	
	mod.command.add('enrage', (param) => {
		if(param == null) {
			mod.settings.enabled = !mod.settings.enabled
			mod.command.message(niceName + 'Enrage Notifier ' + (mod.settings.enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('Enrage Notifier ' + (mod.settings.enabled ? 'enabled' : 'disabled'))
		}
		else if(param === "alert" || param === "center") {
			mod.settings.CENTER_ALERT = !mod.settings.CENTER_ALERT
			mod.command.message(niceName + 'Center alerts ' + (mod.settings.CENTER_ALERT ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Enrage] Center alerts ' + (mod.settings.CENTER_ALERT ? 'enabled' : 'disabled'))
		}
		else if(param === "time" || param === "timer") {
			mod.settings.SHOW_ENRAGE_TIME = !mod.settings.SHOW_ENRAGE_TIME
			mod.command.message(niceName + 'Show enrage time ' + (mod.settings.SHOW_ENRAGE_TIME ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Enrage] Show enrage time ' + (mod.settings.SHOW_ENRAGE_TIME ? 'enabled' : 'disabled'))
		}
		else mod.command.message('Commands:\n'
							+ ' "enrage" (enable/disable Enrage Notifier),\n'
							+ ' "enrage alert" (enable/disable alerts in the center of your screen),\n'
							+ ' "enrage time" (enable/disable logging of enrage time to chat)'
			)
	})
}