module.exports = function EnrageNotifier(dispatch) {
    let hpMax
    let hpCurrent
    let hpPercent
    let nextEnrage
    let enabled = false
    let wasEnraged = 0
    let bosses = new Set()

    dispatch.hook('S_LOGIN', 1, (event) => {
		enabled = true
    })

    dispatch.hook('S_BOSS_GAGE_INFO', 1, (event) => {
        bosses.add("" + event.id)
        hpMax = event.maxHp
        hpCurrent = event.curHp
        hpPercent = Math.floor((hpCurrent / hpMax) * 100)
        nextEnrage = (hpPercent > 10) ? (hpPercent - 10) : 0
    })

    dispatch.hook('S_NPC_STATUS', 1, (event) => {
		if(!enabled) return
        if(!(bosses.has("" + event.creature))) return

        if((event.enraged == 0) && (wasEnraged == 1)) {
            wasEnraged = 0
            let messageString = '<font color="#FFFFFF">Next Enrage at </font><font color="#DC143C">' + nextEnrage + '%</font>'
            if(nextEnrage > 0) notify(messageString)
        }

        if((event.enraged == 1) && (wasEnraged == 0)) {
            wasEnraged = 1

            notify('<font color="#DC143C">Boss Enraged!</font>')          

            /*setTimeout(function() {
                if(!(bosses.has("" + event.creature))) return
                notify('<font color="#FFFFFF">Enrage wearing off in 10 seconds</font>')
			}, 26000)*/
        }
    })

    dispatch.hook('S_DESPAWN_NPC', 1, (event) => {
		if(bosses.delete("" + event.target)) wasEnraged = 0
    })
	
	dispatch.hook('C_WHISPER', 1, (event) => {
		if (/^<FONT>!enragenotifier?<\/FONT>$/i.test(event.message)) {
			if (!enabled) {
				enabled = true
				message('EnrageNotifier <font color="#00EE00">enabled</font>. Whisper "!enragenotifier" to disable.')
			}
			else {
				enabled = false
				message('EnrageNotifier <font color="#DC143C">disabled</font>. Whisper "!enragenotifier" to enable.')
			}
			return false
		}
	})
  
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: msg
		})
	}
	
	function notify(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 21, // Notice
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: msg
		})
	}
}