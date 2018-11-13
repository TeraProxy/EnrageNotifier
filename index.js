// Version 1.1.6

module.exports = function EnrageNotifier(mod) {

	if(mod.proxyAuthor !== 'caali') {
		const options = require('./module').options
		if(options) {
			const settingsVersion = options.settingsVersion
			if(settingsVersion) {
				mod.settings = require('./' + (options.settingsMigrator || 'module_settings_migrator.js'))(mod.settings._version, settingsVersion, mod.settings)
				mod.settings._version = settingsVersion
			}
		}
	}

	let hpPercent,
		nextEnrage,
		inHH = false,
		wasEnraged = false,
		bosses = new Set()

	// ############# //
	// ### Hooks ### //
	// ############# //

	mod.game.me.on('change_zone', (zone, quick) => {
		inHH = zone === 9950
	})

	mod.hook('S_BOSS_GAGE_INFO', 3, event => {
		bosses.add(event.id.toString()) // work with strings so there's no chance JS screws up
		hpPercent = Math.floor(event.curHp.toNumber() / event.maxHp.toNumber() * 100)
		nextEnrage = (hpPercent > 10) ? (hpPercent - 10) : 0
	})

	mod.hook('S_NPC_STATUS', 1, event => {
		if(!mod.settings.enabled || inHH) return
		if(!bosses.has(event.creature.toString())) return

		if(event.enraged != wasEnraged) {
			if(wasEnraged) {
				let messageString = '<font color="#FFFFFF" size="25">Next Enrage at </font><font color="#FF0000" size="30">' + nextEnrage + '%</font>'
				if(nextEnrage > 0) {
					if(mod.settings.CENTER_ALERT) notify(messageString)
					notifyChat(messageString)
				}
			}
			else if(mod.settings.CENTER_ALERT) notify('<font color="#FF0000" size="50">Boss Enraged!</font>')
			wasEnraged = !wasEnraged
		}
	})

	mod.hook('S_DESPAWN_NPC', 3, event => {
		if(bosses.delete(event.gameId.toString())) wasEnraged = false
	})

	// ################# //
	// ### Functions ### //
	// ################# //

	function notify(msg) {
		mod.toClient('S_DUNGEON_EVENT_MESSAGE', 2, {
			type: 42, // 2,19-23,38-39,41-74,80-81
			chat: 0, // show in chat
			channel: 18,
			message: msg
		})
	}

	function notifyChat(msg) {
		mod.command.message(msg)
	}

	// ################ //
	// ### Commands ### //
	// ################ //
	
	mod.command.add('enrage', (cmd) => {
		if(cmd) {
			mod.settings.enabled = !mod.settings.enabled
			mod.command.message((mod.settings.enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Enrage Notifier] ' + (mod.settings.enabled ? 'enabled' : 'disabled'))
		}
		else if(cmd === "alert") {
			mod.settings.CENTER_ALERT = !mod.settings.CENTER_ALERT
			mod.command.message('center alerts ' + (mod.settings.CENTER_ALERT ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Enrage Notifier] center alerts ' + (mod.settings.CENTER_ALERT ? 'enabled' : 'disabled'))
		}
		else mod.command.message('Commands:<br>'
							+ ' "enrage" (enable/disable EnrageNotifier),<br>'
							+ ' "enrage alert" (enable/disable alerts in the center of your screen)'
			)
	})
}