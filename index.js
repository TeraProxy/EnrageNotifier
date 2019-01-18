'use strict'

module.exports = function EnrageNotifier(mod) {

	let hpPercent,
		nextEnrage,
		inHH = false,
		enraged = false,
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

	mod.hook('S_NPC_STATUS', 2, event => {
		if(!mod.settings.enabled || inHH) return
		if(!bosses.has(event.gameId.toString())) return

		let remainingEnrageTime = event.remainingEnrageTime / 1000

		if(event.enraged != enraged) {
			if(enraged == true) {
				let messageString = '<font color="#FFFFFF">Next Enrage at </font><font color="#FF0000">' + nextEnrage + '%</font>'

				if(nextEnrage > 0) {
					if(mod.settings.CENTER_ALERT) notify(messageString)
					if(mod.settings.LOG) notifyChat(messageString)
				}
			}
			else {
				let messageString = '<font color="#FF0000">Boss Enraged for </font><font color="#FFFFFF">' + remainingEnrageTime + ' seconds</font>'

				if(mod.settings.CENTER_ALERT) notify(messageString)
				if(mod.settings.LOG) notifyChat(messageString)
			}
			enraged = !enraged
		}
	})

	mod.hook('S_DESPAWN_NPC', 3, event => {
		if(bosses.delete(event.gameId.toString())) enraged = false
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
		else if(param === "log") {
			mod.settings.LOG = !mod.settings.LOG
			mod.command.message(niceName + 'Logging ' + (mod.settings.LOG ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Enrage] Logging ' + (mod.settings.LOG ? 'enabled' : 'disabled'))
		}
		else mod.command.message('Commands:\n'
							+ ' "enrage" (enable/disable Enrage Notifier),\n'
							+ ' "enrage alert" (enable/disable alerts in the center of your screen),\n'
							+ ' "enrage log" (enable/disable logging of notices to proxy chat)'
			)
	})
}