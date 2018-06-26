class SpeedTest {

    constructor(ip) {

        this.start = 0
        this.finish = 0
        this.int = 0
        this.ip = 0
        this.url = ''
        this.imgSrc = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'

        this.events()
    }

    events() {
        document.querySelector('#startInput').onclick = () => {
            this.start = new Date().getTime()
            // this.ip = document.querySelector('#urlInput').value
            this.doTest()
            return false
        }
    }

    doTest() {
        // let img = new Image()


        this.btnStatus(true)

        $.ajax({
            beforeSend: () => {
                window.startTime = new Date();
            },

            url: document.querySelector('#url').value,

            success: () => {
                window.endTime = new Date();
                this.showRes(true, window.endTime - window.startTime)
            },

            error: (e) => {
                alert('No internet or Access-Control-Allow-Origin err')
                this.showRes(true, 0)
            }
        });


    }

    showRes(status, speed) {
        this.intVal(speed)
        let proc = (360 / 100) * (speed > 99 || status == false ? 95 : speed)

        document.querySelector('.indicator').style.transform = `rotate(${proc}deg)`

    }

    btnStatus(status) {
        document.getElementById("startInput").disabled = status
    }

    intVal(speed) {
        let res = 0
        let oldSpeed = parseInt(document.getElementById("int").innerText)
        let newSpeed = parseInt(speed)
        if (oldSpeed < newSpeed) {
            res = oldSpeed + 1
            setTimeout(() => {
                this.intVal(speed)
            }, 7)
            document.getElementById("int").innerText = parseInt(res)
        } else if (oldSpeed > newSpeed) {
            res = oldSpeed - 1
            setTimeout(() => {
                this.intVal(speed)
            }, 7)
            document.getElementById("int").innerText = parseInt(res)

        } else {
            this.btnStatus(false)
        }
    }

}

new SpeedTest()


