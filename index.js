module.exports = function EnrageNotifier(dispatch) {
    let cid = null,
		player = '',
		hpMax,
		hpCurrent,
		hpPercent,
		nextEnrage,
		enabled = false,
		inHH = false,
		wasEnraged = 0,
		bosses = new Set()

    dispatch.hook('S_LOGIN', 1, (event) => {
		({cid} = event)
		player = event.name
		enabled = true
    })
	
	dispatch.hook('S_LOAD_TOPO', 1, event => {
		if(event.zone == 9950) inHH = true
		else inHH = false
	})

    dispatch.hook('S_BOSS_GAGE_INFO', 1, (event) => {
        bosses.add("" + event.id)
        hpMax = event.maxHp
        hpCurrent = event.curHp
        hpPercent = Math.floor((hpCurrent / hpMax) * 100)
        nextEnrage = (hpPercent > 10) ? (hpPercent - 10) : 0
    })

    dispatch.hook('S_NPC_STATUS', 1, (event) => {
		if(!enabled || inHH) return
        if(!(bosses.has("" + event.creature))) return

        if((event.enraged == 0) && (wasEnraged == 1)) {
            wasEnraged = 0
            let messageString = '<font color="#FFFFFF" size="50">Next Enrage at </font><font color="#FF0000" size="60">' + nextEnrage + '%</font>'
            if(nextEnrage > 0) {
				notify(messageString)
				notifyChat(messageString)
			}
        }

        if((event.enraged == 1) && (wasEnraged == 0)) {
            wasEnraged = 1

            notify('<font color="#FF0000" size="50">Boss Enraged!</font>')
        }
    })

    dispatch.hook('S_DESPAWN_NPC', 1, (event) => {
		if(bosses.delete("" + event.target)) wasEnraged = 0
    })
	
	// ################# //
	// ### Chat Hook ### //
	// ################# //
	
	dispatch.hook('C_WHISPER', 1, (event) => {
		if(event.target.toUpperCase() === "!enragenotifier".toUpperCase()) {
			if (/^<FONT>on?<\/FONT>$/i.test(event.message)) {
				enabled = true
				message('Enrage Notifier <font color="#56B4E9">enabled</font>.')
			}
			else if (/^<FONT>off?<\/FONT>$/i.test(event.message)) {
				enabled = false
				message('Enrage Notifier <font color="#E69F00">disabled</font>.')
			}
			else message('Commands:<br>'
								+ ' "on" (enable Enrage Notifier),<br>'
								+ ' "off" (disable Enrage Notifier)'
						)
			return false
		}
	})
	
	function message(msg) {
		dispatch.toClient('S_WHISPER', 1, {
			player: cid,
			unk1: 0,
			gm: 0,
			unk2: 0,
			author: '!EnrageNotifier',
			recipient: player,
			message: msg
		})
	}
	
	dispatch.hook('C_CHAT', 1, event => {
		if(/^<FONT>!enrage<\/FONT>$/i.test(event.message)) {
			if(!enabled) {
				enabled = true
				message('Enrage Notifier <font color="#56B4E9">enabled</font>.')
				console.log('Enrage Notifier enabled.')
			}
			else {
				enabled = false
				message('Enrage Notifier <font color="#E69F00">disabled</font>.')
				console.log('Enrage Notifier disabled.')
			}
			return false
		}
	})
	
	function notify(msg) {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
            unk1: 42, // 42 Blue Shiny Text, 31 Normal Orange Text, 2 Normal Text any color?
            unk2: 0,
            unk3: 27, // 27
            message: msg
        })
	}
	
	function notifyChat(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 213, // Say
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: ' ' + msg
		})
	}
}